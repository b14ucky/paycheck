from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PayslipSerializer, CreatePayslipSerializer
from .models import Payslip
from django.contrib.auth import get_user_model
from django.http import FileResponse
import io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from .generatePayslip import calculatePayslip

# Create your views here.
class PayslipView(generics.ListAPIView):
    queryset = Payslip.objects.all()
    serializer_class = PayslipSerializer

class CreatePayslipView(APIView):

    userModel = get_user_model()

    def post(self, request):

        data = request.data
        username = data['username']
        user = self.userModel.objects.get(username=username)
        print(user.id)

        if not user:
            return Response({'User Not Found: Invalid User Username'}, status=status.HTTP_404_NOT_FOUND)

        data = calculatePayslip(data['numberOfHours'], data['hourlyWage'], data['costsOfGettingIncome'])

        data.update({'employeeId': user.id})
        serializer = CreatePayslipSerializer(data=data)
        
        if serializer.is_valid(raise_exception=True):
            payslip = serializer.create(data, user)
            if payslip:
                return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetPayslipsView(APIView):

    serializer = PayslipSerializer
    lookupUrlKwarg = 'employeeId'

    def get(self, request):
        employeeId = request.GET.get(self.lookupUrlKwarg)
        if id != None:
            payslips = Payslip.objects.filter(employeeId=employeeId)
            if len(payslips) > 0:
                data = [PayslipSerializer(payslip).data for payslip in payslips]
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Payslips Not Found': 'Invalid Employee ID'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    

class DownloadPayslipView(APIView):

    def payslipToPDF(self, payslipData):
        
        buffer = io.BytesIO()

        fileCanvas = canvas.Canvas(buffer, bottomup=0)

        textObject = fileCanvas.beginText()
        textObject.setTextOrigin(inch, inch)
        textObject.setFont('Helvetica', 14)

        lines = [
            f"netPay: {payslipData['netPay']}",
            f"grossPay: {payslipData['grossPay']}"
        ]

        for line in lines:
            textObject.textLine(line)

        fileCanvas.drawText(textObject)
        fileCanvas.showPage()
        fileCanvas.save()
        buffer.seek(0)

        return buffer

    def post(self, request):

        payslipId = request.data['id']
        payslip = Payslip.objects.get(id=payslipId)
        
        payslipData = PayslipSerializer(payslip).data
        buffer = self.payslipToPDF(payslipData)

        return FileResponse(buffer, as_attachment=True, filename=f"payslip{payslipData['id']}.pdf")
        
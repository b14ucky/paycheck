from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PayslipSerializer, CreatePayslipSerializer
from .models import Payslip
from django.contrib.auth import get_user_model
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from .generatePayslip import PayslipGenerator
from authentication import serializers
from dataclasses import asdict

userModel = get_user_model()


class PayslipView(generics.ListAPIView):
    queryset = Payslip.objects.all()
    serializer_class = PayslipSerializer


class CreatePayslipView(APIView):
    def post(self, request):
        data = request.data
        username = data["username"]

        try:
            user = userModel.objects.get(username=username)
        except userModel.DoesNotExist:
            return Response(
                {"User Not Found: Invalid User Username"},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = PayslipGenerator.calculatePayslip(
            data["hoursWorked"], data["hourlyWage"], data["costsOfGettingIncome"]
        )
        data = asdict(data)

        data.update({"employeeId": user.id})
        serializer = CreatePayslipSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            payslip = serializer.create(data, user)
            if payslip:
                return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetPayslipsView(APIView):
    serializer = PayslipSerializer
    lookupUrlKwarg = "employeeId"

    def get(self, request):
        employeeId = request.GET.get(self.lookupUrlKwarg)
        if id != None:
            payslips = Payslip.objects.filter(employeeId=employeeId)
            if len(payslips) > 0:
                data = [PayslipSerializer(payslip).data for payslip in payslips]
                return Response(data, status=status.HTTP_200_OK)
            elif len(payslips) == 0:
                return Response(
                    {
                        "Payslips Don't Exist": "This employee dosen't have any payslips yet"
                    },
                    status=status.HTTP_204_NO_CONTENT,
                )
            return Response(
                {"Employee Not Found": "Invalid Employee ID"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {"Bad Request": "ID parameter not found in request"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class DownloadPayslipView(APIView):
    def post(self, request):
        payslipId = request.data["id"]
        payslip = Payslip.objects.get(id=payslipId)
        payslipData = PayslipSerializer(payslip).data

        employee = userModel.objects.get(id=payslipData["employeeId"])
        employeeData = serializers.UserSerializer(employee).data

        buffer = PayslipGenerator.createPayslipPDF(payslipData, employeeData)

        return FileResponse(
            buffer, as_attachment=True, filename=f"payslip{payslipData['id']}.pdf"
        )


class DeletePayslipView(APIView):
    def post(self, request):
        payslipId = request.data["id"]
        payslip = Payslip.objects.get(id=payslipId)
        if payslip:
            payslip.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"Payslip Not Found": "Invalid Payslip ID"},
            status=status.HTTP_404_NOT_FOUND,
        )

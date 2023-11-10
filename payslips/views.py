from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PayslipSerializer, CreatePayslipSerializer
from .models import Payslip

# Create your views here.
class PayslipView(generics.ListAPIView):
    queryset = Payslip.objects.all()
    serializer_class = PayslipSerializer

class CreatePayslipView(APIView):

    def post(self, request):
        data = request.data
        serializer = CreatePayslipSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            payslip = serializer.create(data)
            if payslip:
                return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetPayslipView(APIView):
    serializer = PayslipSerializer
    lookupUrlKwarg = 'id'

    def get(self, request):
        id = request.GET.get(self.lookupUrlKwarg)
        if id != None:
            payslip = Payslip.objects.filter(id=id)
            if len(payslip) > 0:
                data = PayslipSerializer(payslip[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Payslip Not Found': 'Invalid Payslip ID'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
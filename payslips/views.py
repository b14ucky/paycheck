from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PayslipSerializer, CreatePayslipSerializer
from .models import Payslip
from django.contrib.auth import get_user_model

# Create your views here.
class PayslipView(generics.ListAPIView):
    queryset = Payslip.objects.all()
    serializer_class = PayslipSerializer

class CreatePayslipView(APIView):

    userModel = get_user_model()

    def calculate(self, numberOfHours, hourlyWage, costsOfGettingIncome):
        numberOfHours = int(numberOfHours)
        hourlyWage = int(hourlyWage)
        costsOfGettingIncome = int(costsOfGettingIncome)

        grossPay = numberOfHours * hourlyWage

        # contributions
        pensionContribution = grossPay * 0.0976
        pensionContribution = round(pensionContribution, 2)
        disabilityContribution = grossPay * 0.015
        disabilityContribution = round(disabilityContribution, 2)
        sicknessInsuranceContribution = grossPay * 0.0245
        sicknessInsuranceContribution = round(sicknessInsuranceContribution, 2)
        socialInsuranceContribution = pensionContribution + disabilityContribution + sicknessInsuranceContribution
        socialInsuranceContribution = round(socialInsuranceContribution, 2)

        # health insurance contribution
        healthInsuranceContributionBasis = grossPay - socialInsuranceContribution
        healthInsuranceContribution = healthInsuranceContributionBasis * 0.09
        healthInsuranceContribution = round(healthInsuranceContribution, 2)

        # taxes
        taxBasis = grossPay - socialInsuranceContribution - costsOfGettingIncome
        taxBasis = round(taxBasis)
        taxDue = taxBasis * 0.12
        taxDue = round(taxDue, 2)
        taxPrepayment = taxDue - 300   # some costs that should be changable but for now I am to lazy to do this 
        taxPrepayment = round(taxPrepayment)

        netPay = grossPay - socialInsuranceContribution - healthInsuranceContribution - taxPrepayment
        netPay = round(netPay, 2)
        grossPay = round(grossPay, 2)

        data = {
            'grossPay': grossPay,
            'pensionContribution': pensionContribution,
            'disabilityContribution': disabilityContribution,
            'sicknessInsuranceContribution': sicknessInsuranceContribution,
            'socialInsuranceContribution': socialInsuranceContribution,
            'healthInsuranceContributionBasis': healthInsuranceContributionBasis,
            'healthInsuranceContribution': healthInsuranceContribution,
            'costsOfGettingIncome': costsOfGettingIncome,
            'taxBasis': taxBasis,
            'taxDue': taxDue,
            'taxPrepayment': taxPrepayment,
            'netPay': netPay
        }

        return data

    def post(self, request):

        data = request.data
        username = data['username']
        user = self.userModel.objects.get(username=username)

        data = self.calculate(data['numberOfHours'], data['hourlyWage'], data['costsOfGettingIncome'])

        if not user:
            return Response({'User Not Found: Invalid User Username'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CreatePayslipSerializer(data=data)
        
        if serializer.is_valid(raise_exception=True):
            payslip = serializer.create(data, user)
            if payslip:
                return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetPayslipView(APIView):

    serializer = PayslipSerializer
    lookupUrlKwarg = 'employeeId'

    def get(self, request):
        employeeId = request.GET.get(self.lookupUrlKwarg)
        if id != None:
            payslip = Payslip.objects.filter(employeeId=employeeId)
            if len(payslip) > 0:
                data = []
                for i in range(len(payslip)):
                    data.append(PayslipSerializer(payslip[i]).data)
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Payslip Not Found': 'Invalid Payslip ID'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
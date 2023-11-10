from rest_framework import serializers
from .models import Payslip

class PayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('id', 'netPay', 'grossPay', 'taxPrepayment', 'socialInsuranceContribution', 'healthInsuranceContribution', 'dateOfPreparation')


class CreatePayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('netPay', 'grossPay', 'taxPrepayment', 'socialInsuranceContribution', 'healthInsuranceContribution', 'dateOfPreparation')

    def create(self, data):
        payslip = Payslip.objects.create(netPay=data['netPay'], grossPay=data['grossPay'], taxPrepayment=data['taxPrepayment'], socialInsuranceContribution=data['socialInsuranceContribution'], healthInsuranceContribution=data['healthInsuranceContribution'])
        payslip.save()
        return payslip
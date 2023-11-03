from rest_framework import serializers
from .models import Payslip

class PayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('netPay', 'grossPay', 'taxPrepayment', 'socialInsuranceContribution', 'healtInsuranceContribution', 'dateOfPreparation')
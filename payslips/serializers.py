from rest_framework import serializers
from .models import Payslip

class PayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('id', 'employeeId', 'netPay', 'grossPay', 'taxBasis', 'taxDue', 'taxPrepayment', 'pensionContribution', 'disabilityContribution', 'sicknessInsuranceContribution', 'socialInsuranceContribution', 'healthInsuranceContributionBasis', 'healthInsuranceContribution', 'costsOfGettingIncome', 'dateOfPreparation')


class CreatePayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('netPay', 'grossPay', 'taxBasis', 'taxDue', 'taxPrepayment', 'pensionContribution', 'disabilityContribution', 'sicknessInsuranceContribution', 'socialInsuranceContribution', 'healthInsuranceContributionBasis', 'healthInsuranceContribution', 'costsOfGettingIncome')

    def create(self, data, user):
        payslip = Payslip.objects.create(employeeId=user, netPay=data['netPay'], grossPay=data['grossPay'], taxBasis=data['taxBasis'], taxDue=data['taxDue'], taxPrepayment=data['taxPrepayment'], pensionContribution=data['pensionContribution'], disabilityContribution=data['disabilityContribution'], sicknessInsuranceContribution=data['sicknessInsuranceContribution'], socialInsuranceContribution=data['socialInsuranceContribution'], healthInsuranceContributionBasis=data['healthInsuranceContributionBasis'], healthInsuranceContribution=data['healthInsuranceContribution'], costsOfGettingIncome=data['costsOfGettingIncome'])
        payslip.save()
        return payslip
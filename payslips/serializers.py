from rest_framework import serializers
from .models import Payslip

class PayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = ('id', 'employeeId', 'netPay', 'grossPay', 'taxBasis', 'taxDue', 'taxPrepayment', 'pensionContribution', 'disabilityContribution', 'sicknessInsuranceContribution', 'socialInsuranceContribution', 'healthInsuranceContributionBasis', 'healthInsuranceContribution', 'costsOfGettingIncome', 'dateOfPreparation')


class CreatePayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = '__all__'

    def create(self, data, user):
        payslip = Payslip.objects.create(
            # employee fields
            employeeId=user,
            grossPay=data['grossPay'],
            pensionContributionEmployee=data['pensionContributionEmployee'],
            disabilityContributionEmployee=data['disabilityContributionEmployee'],
            sicknessContributionEmployee=data['sicknessContributionEmployee'],
            socialContributionsEmployee=data['socialContributionsEmployee'],
            healthInsuranceBase=data['healthInsuranceBase'],
            healthInsuranceContribution=data['healthInsuranceContribution'],
            ppkContributionEmployee=data['ppkContributionEmployee'],
            costsOfGettingIncome=data['costsOfGettingIncome'],
            taxableIncome=data['taxableIncome'],
            taxRate=data['taxRate'],
            taxReductionAmount=data['taxReductionAmount'],
            incomeTax=data['incomeTax'],
            netPay=data['netPay'],
            # employer fields
            pensionContributionEmployer=data['pensionContributionEmployer'],
            disabilityContributionEmployer=data['disabilityContributionEmployer'],
            accidentContributionEmployer=data['accidentContributionEmployer'],
            laborFundContributionEmployer=data['laborFundContributionEmployer'],
            ppkContributionEmployer=data['ppkContributionEmployer'],
            FGSPcontributionEmployer=data['FGSPcontributionEmployer'],
            employerCosts=data['employerCosts']
        )
        payslip.save()
        return payslip
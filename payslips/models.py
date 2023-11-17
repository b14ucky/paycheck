from django.db import models
from django.utils import timezone
from django.conf import settings

# Create your models here.
class Payslip(models.Model):
    # employee related fields
    employeeId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    grossPay = models.FloatField(null=False)
    pensionContributionEmployee = models.FloatField(null=False)
    disabilityContributionEmployee = models.FloatField(null=False)
    sicknessContributionEmployee = models.FloatField(null=False)
    socialContributionsEmployee = models.FloatField(null=False)
    healthInsuranceBase = models.FloatField(null=False)
    healthInsuranceContribution = models.FloatField(null=False)
    ppkContributionEmployee = models.FloatField(null=False)
    costsOfGettingIncome = models.IntegerField(null=False)
    taxableIncome = models.FloatField(null=False)
    taxRate = models.IntegerField(null=False)
    taxReductionAmount = models.FloatField(null=False)
    incomeTax = models.FloatField(null=False)
    netPay = models.FloatField(null=False)
    # employer related fields
    pensionContributionEmployer = models.FloatField(null=False)
    disabilityContributionEmployer = models.FloatField(null=False)
    accidentContributionEmployer = models.FloatField(null=False)
    laborFundContributionEmployer = models.FloatField(null=False)
    ppkContributionEmployer = models.FloatField(null=False)
    FGSPcontributionEmployer = models.FloatField(null=False)
    employerCosts = models.FloatField(null=False)
    # other fields
    dateOfPreparation = models.DateField(default=timezone.now)
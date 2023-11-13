from django.db import models
from django.utils import timezone
from django.conf import settings

# Create your models here.
class Payslip(models.Model):
    employeeId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    netPay = models.FloatField(null=False)
    grossPay = models.FloatField(null=False)
    taxBasis = models.FloatField(null=False)
    taxDue = models.FloatField(null=False)
    taxPrepayment = models.IntegerField(null=False)
    pensionContribution = models.FloatField(null=False)
    disabilityContribution = models.FloatField(null=False)
    sicknessInsuranceContribution = models.FloatField(null=False)
    socialInsuranceContribution = models.FloatField(null=False)
    healthInsuranceContributionBasis = models.FloatField(null=False)
    healthInsuranceContribution = models.FloatField(null=False)
    costsOfGettingIncome = models.IntegerField(null=False)
    dateOfPreparation = models.DateField(default=timezone.now)
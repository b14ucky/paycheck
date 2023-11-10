from django.db import models
from django.utils import timezone

# Create your models here.
class Payslip(models.Model):
    netPay = models.FloatField(null=False)
    grossPay = models.FloatField(null=False)
    taxPrepayment = models.FloatField(null=False)
    socialInsuranceContribution = models.FloatField(null=False)
    healthInsuranceContribution = models.FloatField(null=False)
    dateOfPreparation = models.DateField(default=timezone.now)
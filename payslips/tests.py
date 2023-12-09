from django.test import TestCase
from rest_framework.test import APIClient
from .models import Payslip
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your tests here.
class PayslipAPITest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # create user in database
        user = User.objects.create(username="test", password="password")

        # create payslip object
        Payslip.objects.create(
            employeeId=user,
            costsOfGettingIncome=250,
            grossPay=8000.0,
            netPay=5783.91,
            pensionContributionEmployee=780.8,
            disabilityContributionEmployee=120.0,
            sicknessContributionEmployee=196.0,
            socialContributionsEmployee=1096.09,
            healthInsuranceBase=6903.2,
            healthInsuranceContribution=621.29,
            taxableIncome=6653.2,
            taxRate=12,
            taxReductionAmount=300,
            incomeTax=498,
            ppkContributionEmployee=0,
            pensionContributionEmployer=780.8,
            disabilityContributionEmployer=520.0,
            accidentContributionEmployer=133.6,
            laborFundContributionEmployer=196.0,
            FGSPcontributionEmployer=8.0,
            ppkContributionEmployer=0,
            employerCosts=9638.4,
        )

    def testCreatePayslip(self):
        print("Test: Create Payslip")
        client = APIClient()

        # Create a payslip
        response = client.post(
            "/api/create-payslip/",
            {
                "username": "test",
                "hoursWorked": 100,
                "hourlyWage": 80,
                "costsOfGettingIncome": 250,
            },
        )

        # Check if the response is correct
        self.assertEqual(response.status_code, 201)

        # Check if the payslip is created
        self.assertEqual(Payslip.objects.count(), 2)

        payslip = Payslip.objects.first()

        # Check if the values are correct
        self.assertEqual(payslip.grossPay, 8000.0)
        self.assertEqual(payslip.netPay, 5783.91)
        self.assertEqual(payslip.pensionContributionEmployee, 780.8)
        self.assertEqual(payslip.disabilityContributionEmployee, 120.0)
        self.assertEqual(payslip.sicknessContributionEmployee, 196.0)
        self.assertEqual(payslip.healthInsuranceBase, 6903.2)
        self.assertEqual(payslip.healthInsuranceContribution, 621.29)
        self.assertEqual(payslip.taxableIncome, 6653.2)
        self.assertEqual(payslip.taxRate, 12)
        self.assertEqual(payslip.taxReductionAmount, 300)
        self.assertEqual(payslip.incomeTax, 498)
        self.assertEqual(payslip.pensionContributionEmployer, 780.8)
        self.assertEqual(payslip.disabilityContributionEmployer, 520.0)
        self.assertEqual(payslip.accidentContributionEmployer, 133.6)
        self.assertEqual(payslip.laborFundContributionEmployer, 196.0)
        self.assertEqual(payslip.FGSPcontributionEmployer, 8.0)
        self.assertEqual(payslip.employerCosts, 9638.4)

    def testCreatePayslipInvalidUsername(self):
        print("Test: Create Payslip Invalid Username")

        client = APIClient()

        # Create a payslip
        response = client.post("/api/create-payslip/", {"username": ""})

        # Check if the response is correct
        self.assertEqual(response.status_code, 404)

    def testGetPayslips(self):
        print("Test: Get Payslip")

        client = APIClient()

        # Get payslip

        response = client.get("/api/get-payslip/?employeeId=1")

        # Check if the response is correct
        self.assertEqual(response.status_code, 200)

        # Check if we get the correct number of payslips
        self.assertEqual(len(response.data), 1)

        # Check if the values are correct
        self.assertEqual(response.data[0]["grossPay"], 8000.0)

    def testDownloadPayslip(self):
        print("Test: Download Payslip")

        client = APIClient()

        # Download payslip

        response = client.post("/api/download-payslip/", {"id": 1})

        # Check if the response is correct
        self.assertEqual(response.status_code, 200)

        # Check if the response is correct
        self.assertEqual(response["Content-Type"], "application/pdf")

    def testDeletePayslip(self):
        print("Test: Delete Payslip")

        client = APIClient()

        # Delete payslip

        response = client.post("/api/delete-payslip/", {"id": 1})

        # Check if the response is correct
        self.assertEqual(response.status_code, 200)

        # Check if the payslip is deleted
        self.assertEqual(Payslip.objects.count(), 0)

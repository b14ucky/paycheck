from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Spacer, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime
import io


def calculatePayslip(hoursWorked: float, hourlyWage: float, costsOfGettingIncome: int, hasPPK: bool = False, taxReductionAmount: int = 300):
    # tax related constants
    taxRateLow = 0.12
    taxRateHigh = 0.32
    taxThreshold = 85528
    # employee contribution related constants
    pensionContributionRateEmployee = 0.0976
    disabilityContributionRateEmployee = 0.015
    sicknessContributionRateEmployee = 0.0245
    healthInsuranceRate = 0.09
    # employer contribution related constants
    pensionContributionRateEmployer = 0.0976
    disabilityContributionRateEmployer = 0.065
    accidentContributionRateEmployer = 0.0167
    laborFundContributionRateEmployer = 0.0245
    FGSPcontributionRateEmployer = 0.001
    # PPK (Pracownicze Plany Kapitałowe) contribution related constatns
    ppkContributionRateEmployee = 0.02 if hasPPK else 0
    ppkContributionRateEmployer = 0.015 if hasPPK else 0

    # convert all values to make sure they are correct types
    hoursWorked = float(hoursWorked)
    hourlyWage = float(hourlyWage)
    costsOfGettingIncome = int(costsOfGettingIncome)

    grossPay = round(hoursWorked * hourlyWage, 2)

    # social insurance contributions for the employee
    pensionContributionEmployee = round(grossPay * pensionContributionRateEmployee, 2)
    disabilityContributionEmployee = round(grossPay * disabilityContributionRateEmployee, 2)
    sicknessContributionEmployee = round(grossPay * sicknessContributionRateEmployee, 2)

    # total of social contributions for the employee
    socialContributionsEmployee = pensionContributionEmployee + disabilityContributionEmployee + sicknessContributionEmployee

    # health insurance contribution
    healthInsuranceBase = grossPay - socialContributionsEmployee
    healthInsuranceContribution = round(healthInsuranceBase * healthInsuranceRate, 2)

    # calculate PPK contributions
    ppkContributionEmployee = round(grossPay * ppkContributionRateEmployee, 2)
    ppkContributionEmployer = round(grossPay * ppkContributionRateEmployer, 2)

    # calculate income tax
    taxableIncome = grossPay - socialContributionsEmployee - costsOfGettingIncome + ppkContributionEmployer

    if taxableIncome <= taxThreshold: taxRate = taxRateLow
    else: taxRate = taxRateHigh

    incomeTaxBeforeReduction = round(taxableIncome * taxRate) 
    incomeTax = incomeTaxBeforeReduction - taxReductionAmount

    # calculate net pay
    netPay = round(grossPay - socialContributionsEmployee - healthInsuranceContribution - ppkContributionEmployee - incomeTax, 2)

    # contributions for employer
    pensionContributionEmployer = round(grossPay * pensionContributionRateEmployer, 2)
    disabilityContributionEmployer = round(grossPay * disabilityContributionRateEmployer, 2)
    accidentContributionEmployer = round(grossPay * accidentContributionRateEmployer, 2)
    laborFundContributionEmployer = round(grossPay * laborFundContributionRateEmployer, 2)
    FGSPcontributionEmployer = round(grossPay * FGSPcontributionRateEmployer, 2)

    # calculate total employer costs
    employerCosts = round(grossPay + pensionContributionEmployer + disabilityContributionEmployer + accidentContributionEmployer + laborFundContributionEmployer + FGSPcontributionEmployer + ppkContributionEmployer, 2)

    payslipData = {
        # employee payslipData
        'grossPay': grossPay,
        'pensionContributionEmployee': pensionContributionEmployee,
        'disabilityContributionEmployee': disabilityContributionEmployee,
        'sicknessContributionEmployee': sicknessContributionEmployee,
        'socialContributionsEmployee': socialContributionsEmployee,
        'healthInsuranceBase': healthInsuranceBase,
        'healthInsuranceContribution': healthInsuranceContribution,
        'ppkContributionEmployee': ppkContributionEmployee,
        'costsOfGettingIncome': costsOfGettingIncome,
        'taxableIncome': taxableIncome,
        'taxRate': taxRate * 100,    # muliply by 100 so the actual value that is returned is an integer (e.g. 12%)
        'taxReductionAmount': taxReductionAmount,
        'incomeTax': incomeTax,
        'netPay': netPay,
        # employer payslipData
        'pensionContributionEmployer': pensionContributionEmployer,
        'disabilityContributionEmployer': disabilityContributionEmployer,
        'accidentContributionEmployer': accidentContributionEmployer,
        'laborFundContributionEmployer': laborFundContributionEmployer,
        'ppkContributionEmployer': ppkContributionEmployer,
        'FGSPcontributionEmployer': FGSPcontributionEmployer,
        'employerCosts': employerCosts
    }

    return payslipData


def createPayslipPDF(payslipData, employeeData):

    buffer = io.BytesIO()
    pdfDocument = SimpleDocTemplate(buffer, pagesize=letter)

    dateOfPreparation = payslipData['dateOfPreparation']

    styles = getSampleStyleSheet()

    # create data for the employee table
    employeeTableData = [
        ["Gross Salary:", f"{payslipData['grossPay']} PLN"],
        ["Total Social Contributions:", f"{payslipData['socialContributionsEmployee']} PLN"],
        ["Pension Contribution:", f"{payslipData['pensionContributionEmployee']} PLN"],
        ["Disability Contribution:", f"{payslipData['disabilityContributionEmployee']} PLN"],
        ["Sickness Contribution:", f"{payslipData['sicknessContributionEmployee']} PLN"],
        ["Health Insurance Base:", f"{payslipData['healthInsuranceBase']} PLN"],
        ["Health Insurance Contribution:", f"{payslipData['healthInsuranceContribution']} PLN"],
        ["Income Costs:", f"{payslipData['costsOfGettingIncome']} PLN"],
        ["Taxable Income:", f"{payslipData['taxableIncome']} PLN"],
        ["Tax Rate:", f"{payslipData['taxRate']}%"],
        ["Tax Reduction:", f"{payslipData['taxReductionAmount']} PLN"],
        ["Income Tax:", f"{payslipData['incomeTax']} PLN"],
        ["Net Salary:", f"{payslipData['netPay']} PLN"],
    ]

    # create the employee table and set style
    employeeTable = Table(employeeTableData, colWidths=[250, 250])
    employeeTable.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.steelblue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))

    # create data for the employer table
    employerTableData = [
        ["Pension Contribution:", f"{payslipData['pensionContributionEmployer']} PLN"],
        ["Disability Contribution:", f"{payslipData['disabilityContributionEmployer']} PLN"],
        ["Accident Contribution:", f"{payslipData['accidentContributionEmployer']} PLN"],
        ["Labor Fund Contribution:", f"{payslipData['laborFundContributionEmployer']} PLN"],
        ["FGSP Contribution:", f"{payslipData['FGSPcontributionEmployer']} PLN"],
        ["PPK Contribution:", f"{payslipData['ppkContributionEmployer']} PLN"],
        ["Total Employer Costs:", f"{payslipData['employerCosts']} PLN"],
    ]

    # create the employer table and set style
    employerTable = Table(employerTableData, colWidths=[250, 250])
    employerTable.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.steelblue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))

    # apply alternating row colors to the tables
    def alternateRowColors(tableData):
        style = [
            ('BACKGROUND', (0, i), (-1, i), colors.lightblue if i % 2 == 1 else colors.white)
            for i in range(1, len(tableData))
        ]
        return style

    employeeTable.setStyle(alternateRowColors(employeeTableData))
    employerTable.setStyle(alternateRowColors(employerTableData))

    # build pdf document
    content = [
        Paragraph(f"<b>Date of Preparation:</b> {dateOfPreparation}", styles['Normal']),
        Spacer(1, 10),
        Paragraph(f"<b>Employee Information:</b> {employeeData['first_name']} {employeeData['last_name']}", styles['Heading2']),
        employeeTable,
        Spacer(1, 20),
        Paragraph("<b>Employer Contributions:</b>", styles['Heading2']),
        employerTable,
    ]

    pdfDocument.build(content)

    buffer.seek(0)

    return buffer
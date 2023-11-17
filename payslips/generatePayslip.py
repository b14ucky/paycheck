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
    netPay = grossPay - socialContributionsEmployee - healthInsuranceContribution - ppkContributionEmployee - incomeTax

    # contributions for employer
    pensionContributionEmployer = round(grossPay * pensionContributionRateEmployer, 2)
    disabilityContributionEmployer = round(grossPay * disabilityContributionRateEmployer, 2)
    accidentContributionEmployer = round(grossPay * accidentContributionRateEmployer, 2)
    laborFundContributionEmployer = round(grossPay * laborFundContributionRateEmployer, 2)
    FGSPcontributionEmployer = round(grossPay * FGSPcontributionRateEmployer, 2)

    # calculate total employer costs
    employerCosts = grossPay + pensionContributionEmployer + disabilityContributionEmployer + accidentContributionEmployer + laborFundContributionEmployer + FGSPcontributionEmployer + ppkContributionEmployer

    data = {
        # employee data
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
        # employer data
        'pensionContributionEmployer': pensionContributionEmployer,
        'disabilityContributionEmployer': disabilityContributionEmployer,
        'accidentContributionEmployer': accidentContributionEmployer,
        'laborFundContributionEmployer': laborFundContributionEmployer,
        'ppkContributionEmployer': ppkContributionEmployer,
        'FGSPcontributionEmployer': FGSPcontributionEmployer,
        'employerCosts': employerCosts
    }

    return data
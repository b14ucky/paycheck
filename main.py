class User:
    
    def __init__(self, login: str, password: str, privileges: int, payslips: list = None):
        self.login = login
        self.password = password
        self.privileges = privileges
        self.payslips = payslips if payslips is not None else []

    def addPayslip(self, payslip: object):
        self.payslips.append(payslip)

class Payslip:

    def __init__(self, grossSalary: float, netSalary: float, taxPrepayment: int, socialInsuranceContribution: float, healthInsuranceContribution: float):
        self.grossSalary = grossSalary
        self.netSalary = netSalary
        self.taxPrepayment = taxPrepayment
        self.socialInsuranceContribution = socialInsuranceContribution
        self.healthInsuranceContribution = healthInsuranceContribution

    def printPayslip(self):
        print('****************************************')
        print(f'Gross salary: {self.grossSalary}')
        print(f'Social contributions: {self.socialInsuranceContribution}')
        print(f'Health insurance contributions: {self.healthInsuranceContribution}')
        print(f'Tax: {self.taxPrepayment}')
        print(f'Net salary: {self.netSalary}')
        print('****************************************')

    # storing this as a file is temporary, just for the purpose of testing
    def savePayslip(self, file: str, login: str):
        with open(file, 'a') as payslipsFile:

            fileContent = f'{login};{payslip.grossSalary};{payslip.netSalary};{payslip.taxPrepayment};{payslip.socialInsuranceContribution};{payslip.healthInsuranceContribution}\n'

            payslipsFile.write(fileContent)


users = [
    User('marta', '1234', 2),    # userPrivileges: 1 - worker, 2 - accountant, 3 - admin
    User('jan', '4321', 1),
    User('adam', '123321', 0)
]

payslipsFile = open('payslips.txt', 'r')
payslipsContentLines = payslipsFile.readlines()

for line in payslipsContentLines:
    payslipContent = line.strip().split(';')
    for user in users:
        if user.login == payslipContent[0]:
            payslip = Payslip(payslipContent[1], payslipContent[2], payslipContent[3], payslipContent[4], payslipContent[5])
            user.addPayslip(payslip)

payslipsFile.close()


def loginDataCheck(login, password, users):
    for user in users:
        if user.login == login and user.password == password:
            return user
    return None

def calculateSalary(numberOfHours, hourlyWage, higherCostsOfGettingIncome):
    grossSalary = numberOfHours * hourlyWage

    # contributions
    pensionContribution = grossSalary * 0.0976
    disabilityContribution = grossSalary * 0.015
    sicknessInsuranceContribution = grossSalary * 0.0245
    socialInsuranceContribution = pensionContribution + disabilityContribution + sicknessInsuranceContribution
    socialInsuranceContribution = round(socialInsuranceContribution, 2)

    # health insurance contribution
    basis = grossSalary - socialInsuranceContribution          # by name "basis" I meant basis for calculating health insurance contributions
    healthInsuranceContribution = basis * 0.09
    healthInsuranceContribution = round(healthInsuranceContribution, 2)

    # costs of getting income
    if higherCostsOfGettingIncome: costs = 300
    else: costs = 250

    # taxes
    taxBasis = grossSalary - socialInsuranceContribution - costs
    taxBasis = round(taxBasis)
    taxDue = taxBasis * 0.12
    taxPrepayment = taxDue - 300   # some costs that should be changable but for now I am to lazy to do this 
    taxPrepayment = round(taxPrepayment)

    netSalary = grossSalary - socialInsuranceContribution - healthInsuranceContribution - taxPrepayment
    netSalary = round(netSalary, 2)

    return Payslip(grossSalary, netSalary, taxPrepayment, socialInsuranceContribution, healthInsuranceContribution)


print('Welcome to salaries app. Please provide your login info to continue')

loggedUser = None

while loggedUser is None:
    login = input('Login: ').strip()
    password = input('Password: ')
    loggedUser = loginDataCheck(login, password, users)
    if not loggedUser: print('invalid login or password')


if loggedUser:
    print('welcome to your homescreen')
    if loggedUser.privileges == 3:
        print('admin')
    elif loggedUser.privileges == 2:
        while True:
            selection = input('do you want to calculate a salary (y/n): ').lower()[0]
            if selection != 'y' and selection != 'n':
                print('wrong selection try again')
            if selection == 'y':
                break

        print('welcome to salary calculator')
        numberOfHours = int(input('Please enter a number of hours: '))
        hourlyWage = float(input('Please enter the hourly wage: '))

        while True:
            selection = input('do you want to include higher costs of getting income (y/n): ').lower()[0]
            if selection != 'y' and selection != 'n':
                print('wrong selection try again')
            if selection == 'y':
                higherCostsOfGettingIncome = True
                break
            else:
                higherCostsOfGettingIncome = False
                break
        
        payslip = calculateSalary(numberOfHours, hourlyWage, higherCostsOfGettingIncome)

        payslip.printPayslip()

        # for the purpose of testing
        logins = ['adam', 'marta', 'jan']


        while True:
            login = input('Whose payslip is it? Please provide me with workers login: ')
            if login in logins:
                payslip.savePayslip('payslips.txt', login)
                break
            else:
                print('wrong login please try again!')


    elif loggedUser.privileges == 1:
        print('this is a list of your salaries')
        for payslip in loggedUser.payslips:
            payslip.printPayslip()
    else:
        raise ValueError('wrong privileges number')


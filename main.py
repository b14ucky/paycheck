class User:
    
    def __init__(self, login: str, password: str, userPrivileges: int):
        self.login = login
        self.password = password
        self.userPrivileges = userPrivileges

users = [
    User('marta', '1234', 2),    # userPrivileges: 1 - worker, 2 - accountant, 3 - admin
    User('jan', '4321', 1)
]


def loginDataCheck(login, password, users):
    for user in users:
        if user.login == login and user.password == password:
            return user
    return None

print('Welcome to salaries app. Please provide your login info to continue')

loggedUser = None

while loggedUser is None:
    login = input('Login: ').strip()
    password = input('Password: ')
    loggedUser = loginDataCheck(login, password, users)
    if loggedUser:
        print('welcome to your homescreen')
    else:
        print('invalid login or password')

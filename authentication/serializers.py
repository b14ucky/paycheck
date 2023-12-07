from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
import re

userModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = '__all__'

    def validatePassword(self, password, username):
        errors = []
        if len(password) < 8: errors.append("Password should be at least 8 characters long!")
        if password == username: errors.append("Password should be different than username!")
        if re.search(r'(?=.*[A-Z])', password) is None: errors.append("Password should contain at least one uppercase letter!")
        if re.search(r'(?=.*[a-z])', password) is None: errors.append("Password should contain at least one lowercase letter!")
        if re.search(r'(?=.*\d)', password) is None: errors.append("Password should contain at least one digit!")
        if re.search(r'(?=.*[@$!%*?&])', password) is None: errors.append("Password shoul contain at least one special character!")
        if errors: return errors
        else: return "valid"
        

    def create(self, data):
        validation = self.validatePassword(data['password'], data['username'])
        if validation == 'valid':
            userObject = userModel.objects.create_user(username=data['username'], password=data['password'])
            userObject.first_name = data['firstName']
            userObject.last_name = data['lastName']
            userObject.email = data['email']
            userObject.save()
            return {'user': userObject, 'errors': ''}
        else: return {'user': None, 'errors': validation}


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def checkUser(self, data):
        user = authenticate(username=data['username'], password=data['password'])

        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  userModel
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)
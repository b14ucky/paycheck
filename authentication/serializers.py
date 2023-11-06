from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

userModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = '__all__'

    def create(self, data):
        userObject = userModel.objects.create_user(username=data['username'], password=data['password'])
        userObject.email = data['email']
        userObject.save()
        return userObject


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def checkUser(self, data):
        user = authenticate(username=data['username'], password=data['password'])

        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  userModel
        fields = ('username', 'email')
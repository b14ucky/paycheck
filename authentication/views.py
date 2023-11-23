from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.models import Group
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer, GroupSerializer

from rest_framework import permissions, status

userModel = get_user_model()

class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = request.data
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(data)
            if user['user'] is None:
                return Response({'InvalidPassword': user['errors']}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.checkUser(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    

class UsersView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        users = []
        for user in userModel.objects.all():
            userData = UserSerializer(user).data
            userData.update({'groups': [group for group in GroupSerializer(user.groups.all(), many=True).data]})
            users.append(userData)

        if len(users) > 0:
            return Response({'users': users}, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        userData = UserSerializer(request.user).data
        userData.update({'groups': [group for group in GroupSerializer(request.user.groups.all(), many=True).data]})
        return Response({'user': userData}, status=status.HTTP_200_OK)
    

class AddUserToGroupView(APIView):
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):

        userId = request.data['userId']
        groupName = request.data['groupName']

        user = userModel.objects.get(id=userId)
        group = Group.objects.get(name=groupName)

        isMember = user.groups.filter(name=groupName).exists()

        if isMember:
            return Response({'User Already In Group': f'User {user.username} is already a member of {groupName} group'}, status=status.HTTP_400_BAD_REQUEST)

        user.groups.add(group)
        return Response({'User Added': f'Added user {user.username} to {groupName} group'}, status=status.HTTP_200_OK)

class RemoveUserFromGroupView(APIView):
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        userId = request.data['userId']
        groupName = request.data['groupName']

        user = userModel.objects.get(id=userId)
        group = Group.objects.get(name=groupName)

        isMember = user.groups.filter(name=groupName).exists()

        if isMember:
            user.groups.remove(group)
            return Response({'User Removed': f'User {user.username} has been removed from {groupName} group'}, status=status.HTTP_200_OK)

        return Response({'User Not In Group': f'User {user.username} is not a memeber of {groupName} group'}, status=status.HTTP_400_BAD_REQUEST) 

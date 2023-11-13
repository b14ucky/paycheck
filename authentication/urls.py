from django.urls import path
from .views import UserView, UserRegisterView, LoginView, LogoutView

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
]
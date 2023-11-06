from django.urls import path
from .views import UserView, UserRegister, LoginView, LogoutView

urlpatterns = [
    path('register', UserRegister.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
]
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('register/', index),
    path('dashboard/', index),
    path('calculator/', index),
    path('payslips/', index),
    path('manage-payslips/', index),
]
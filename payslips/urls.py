from django.urls import path
from .views import PayslipView, GetPayslipView, CreatePayslipView

urlpatterns = [
    path('payslip/', PayslipView.as_view()),
    path('get-payslip/', GetPayslipView.as_view()),
    path('create-payslip/', CreatePayslipView.as_view()),
]

from django.urls import path
from .views import PayslipView, GetPayslipView

urlpatterns = [
    path('payslip/', PayslipView.as_view()),
    path('get-payslip/', GetPayslipView.as_view()),
]

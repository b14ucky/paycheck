from django.urls import path
from .views import PayslipView, GetPayslipsView, CreatePayslipView, DownloadPayslipView

urlpatterns = [
    path('payslip/', PayslipView.as_view()),
    path('get-payslip/', GetPayslipsView.as_view()),
    path('create-payslip/', CreatePayslipView.as_view()),
    path('download-payslip/', DownloadPayslipView.as_view()),
]

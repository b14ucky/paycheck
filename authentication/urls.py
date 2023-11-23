from django.urls import path
from .views import CurrentUserView, UserRegisterView, LoginView, LogoutView, UsersView, AddUserToGroupView, RemoveUserFromGroupView

urlpatterns = [
    path('register', UserRegisterView.as_view(),),
    path('login', LoginView.as_view(),),
    path('logout', LogoutView.as_view(),),
    path('users', UsersView.as_view()),
    path('user', CurrentUserView.as_view(),),
    path('add-to-group', AddUserToGroupView.as_view()),
    path('remove-from-group', RemoveUserFromGroupView.as_view()),
]
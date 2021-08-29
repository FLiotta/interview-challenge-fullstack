from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import api

urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('ping', api.AuthAPI.as_view(), name="Auth"),

    # Profile
    path('profile', api.ProfileAPI.as_view(), name="profile"),

    # Account
    path('account', api.AccountAPI.as_view(), name="account"),
    path('account/<int:account_id>', api.AccountDetailAPI.as_view(), name="account_detail"),
    path('account/<int:account_id>/operations', api.AccountOperationsAPI.as_view(), name="account_operations"),
    path('account/<int:account_id>/deposit', api.AccountDepositAPI.as_view(), name="account_deposit")
]

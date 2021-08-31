from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .routes import data, account, profile, auth

urlpatterns = [
    # Auth
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup', auth.AuthCreateView.as_view(), name="signup_view"),

    # Data
    path('data/currencies', data.CurrencyAPI.as_view(), name="currency"),
    path('data/currencies/<int:currency_id>', data.CurrencyDetailAPI.as_view(), name="currency_detail"),

    # Profile
    path('profile', profile.ProfileAPI.as_view(), name="profile"),

    # Account
    path('account', account.AccountAPI.as_view(), name="account"),
    path('account/<int:account_id>', account.AccountDetailAPI.as_view(), name="account_detail"),
    path('account/<int:account_id>/operations', account.AccountOperationsAPI.as_view(), name="account_operations"),
    path('account/<int:account_id>/deposit', account.AccountDepositAPI.as_view(), name="account_deposit"),
    path('account/<int:account_id>/send', account.AccountSendAPI.as_view(), name="account_send")
]
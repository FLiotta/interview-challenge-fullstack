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
    path('profile', api.ProfileAPI.as_view(), name="profile")
]

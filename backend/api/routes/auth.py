from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from ..serializers import UserSerializer

class AuthCreateView(APIView):
    permissions_classes = (AllowAny, )

    def post(self, request):
        user_to_create = {
            "username": request.data.get("username"),
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "email": request.data.get("email"),
            "password": request.data.get("password"),
            "is_superuser": False,
            "is_staff": False
        }

        new_user = UserSerializer(data=user_to_create)

        if new_user.is_valid():
            user = new_user.save()

            tokens = RefreshToken.for_user(user)

            return Response({
                "refresh": str(tokens),
                "access": str(tokens.access_token)
            })
        else:
            return Response({
                "error": "User can't be created",
                "data": new_user.errors
            }, status=status.HTTP_400_BAD_REQUEST)

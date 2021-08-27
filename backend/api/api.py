from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User

class AuthAPI(APIView):
    def get(self, request):

        return Response({'ping': 'pong'})

class ProfileAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        user_serialized = UserSerializer(user)

        return Response({
            'data': user_serialized.data
        })
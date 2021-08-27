from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()
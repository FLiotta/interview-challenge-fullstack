from __future__ import annotations

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Account, Currency, Operation

class UserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()

class CurrencySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField()
    symbol = serializers.CharField()

class AccountSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(required=False)
    funds = serializers.IntegerField(required=False)
    currency = CurrencySerializer(read_only=True)
    currency_id = serializers.IntegerField(write_only=True)
    owner_id = serializers.IntegerField()
    created_at = serializers.DateField(required=False)
    updated_at = serializers.DateField(required=False)

    def create(self, validated_data):
        instance = Account()

        instance.owner_id = validated_data.get('owner_id')
        instance.funds = 0
        instance.currency_id = validated_data.get('currency_id')
        instance.name = validated_data.get('name')
        instance.save()

        return instance

    
        


class OperationSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    amount = serializers.IntegerField()
    currency_id = serializers.IntegerField(write_only=True)
    operation_type = serializers.CharField()
    sender_account_id = serializers.IntegerField(allow_null=True, required=False)
    receiver_account_id = serializers.IntegerField()
    created_at = serializers.DateField(read_only=True)

    class Meta:
        model = Operation

    def create(self, validated_data):
        instance = Operation()

        instance.amount = validated_data.get('amount')
        instance.currency_id = validated_data.get('currency_id')
        instance.operation_type = validated_data.get('operation_type')
        instance.receiver_account_id = validated_data.get('receiver_account_id')
        instance.sender_account_id = validated_data.get('sender_account_id')

        instance.save()

        return instance
    
    def validate_operation_type(self, data):
        if data != 'transfer' and data != 'deposit':
            raise serializers.ValidationError("Invalid operation_type: (deposit or transfer)")
        else:
            return data

    def validate_amount(self, data):
        if type(data) != int:
            raise serializers.ValidationError("Invalid amount: A number is expected")
        elif data <= 0:
            raise serializers.ValidationError("Invalid amount: It can't be less or equal to 0")
        else:
            return data
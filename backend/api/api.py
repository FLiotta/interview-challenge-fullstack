from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer, AccountSerializer, OperationSerializer 
from .models import Account, Operation
from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Q

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

class AccountAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user_id = request.user.id
        accounts = Account.objects.filter(owner_id=user_id)
        accounts_serialized = AccountSerializer(accounts, many=True)

        return Response({
            'data': accounts_serialized.data,
            'metadata': {
                'total': len(accounts_serialized.data)
            }
        })

class AccountDetailAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, account_id):
        user_id = request.user.id
        account = Account.objects.get(id=account_id)

        if not account.owner_id == user_id:
            return Response({
                "error": "You can't perform this action.",
                "message": "This account belong to another user."
            }, status=status.HTTP_403_FORBIDDEN)

        account_serialized = AccountSerializer(account)

        return Response({
            'data': account_serialized.data
        })

class AccountOperationsAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, account_id):
        user_id = request.user.id
        account = Account.objects.get(id=account_id)
        
        if not account.owner_id == user_id:
            return Response({
                "error": "You can't perform this action.",
                "message": "Only the account's owner can request its transactions."
            }, status=status.HTTP_403_FORBIDDEN)

        operations = account.get_operations()
        operations_serialized = OperationSerializer(operations, many=True)

        return Response({ 'data': operations_serialized.data })

class AccountDepositAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, account_id):
        with transaction.atomic():
            user_id = request.user.id
            amount = request.data['amount']
            account = Account.objects.get(id=account_id)

            if not account.owner_id == user_id:
                return Response({
                    "error": "You can't perform this action.",
                    "message": "This account belong to another user."
                }, status=status.HTTP_403_FORBIDDEN)

            account.funds = account.funds + amount
            account.save()

            new_operation_payload = {
                "amount": amount,
                "receiver_account_id": account_id,
                "operation_type": 'deposit',
                "currency_id": account.currency.id
            }

            new_operation = OperationSerializer(data=new_operation_payload)

            if new_operation.is_valid(raise_exception=True):
                new_operation.save()
                return Response({ 'data': new_operation.data })
            else:
                return Response({
                    "error": "Transaction can't be commited",
                    "message": "Please revalidate your inputs."
                }, status=status.HTTP_400_BAD_REQUEST)


#/account
#/account/:id
#/account/:id/send
#/account/:id/deposit

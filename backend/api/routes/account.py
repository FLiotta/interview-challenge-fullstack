from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Q

from ..models import Account, Operation
from ..serializers import UserSerializer, AccountSerializer, OperationSerializer 

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

    def post(self, request):
        user_id = request.user.id

        new_account_payload = {
            "currency_id": request.data["currency_id"],
            "name": request.data["name"],
            "owner_id": user_id
        }

        new_account = AccountSerializer(data=new_account_payload)
        
        if new_account.is_valid():
            new_account.save()

            return Response({
                "data": new_account.data
            })
        else:
            return Response({
                "error": "Account can't be created",
                "message": "Please check parameters sent",
                "data": new_account.errors
            }, status=status.HTTP_400_BAD_REQUEST)

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
        
        limit = int(request.query_params.get('limit', 10))
        offset = int(request.query_params.get('page', 0))

        if not account.owner_id == user_id:
            return Response({
                "error": "You can't perform this action.",
                "message": "Only the account's owner can request its transactions."
            }, status=status.HTTP_403_FORBIDDEN)

        operations = account.get_operations(limit,offset)
        operations_serialized = OperationSerializer(operations.get('operations'), many=True)

        return Response({
            "data": operations_serialized.data, 
            "metadata": {
                "total": operations.get('count'),
                "page": offset,
                "limit": limit
            }
        })


class AccountSendAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self,request,account_id):
        with transaction.atomic():
            user_id = request.user.id
            amount = request.data['amount']
            deposit_address = request.data['deposit_address']

            sender_account = Account.objects \
                .select_for_update() \
                .get(id=account_id) \
                .update()

            receiver_account = Account.objects \
                .select_for_update() \
                .get(deposit_address=deposit_address)

            if not sender_account.owner_id == user_id:
                return Response({
                    "error": "You can't perform this action.",
                    "message": "This account belong to another user."
                }, status=status.HTTP_403_FORBIDDEN)

            elif sender_account.currency_id != receiver_account.currency_id:
                return Response({
                    "error": "Different currencies",
                    "messages": "You can only transfer between accounts with the same currencies"
                }, status=status.HTTP_400_BAD_REQUEST)

            elif sender_account.funds < amount:
                remaining_funds = amount - sender_account.funds
                return Response({
                    "error": "Insufficient funds",
                    "message": "You need ${0} extra to perform this action.".format(remaining_funds)
                }, status=status.HTTP_400_BAD_REQUEST)
            
            sender_account.funds = sender_account.funds - amount
            receiver_account.funds = receiver_account.funds + amount

            new_operation_payload = {
                "amount": amount,
                "receiver_account_id": receiver_account.id,
                "sender_account_id": sender_account.id,
                "currency_id": sender_account.currency_id,
                "operation_type": "transfer"
            }

            new_operation = OperationSerializer(data=new_operation_payload)

            if new_operation.is_valid():
                sender_account.save()
                receiver_account.save()
                new_operation.save()

                return Response({ "data": new_operation.data })

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
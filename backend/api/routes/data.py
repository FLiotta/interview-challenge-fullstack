from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from ..models import Currency
from ..serializers import CurrencySerializer

class CurrencyAPI(APIView):
    def get(self, request):
        currencies = Currency.objects.all()
        currencies_serialized = CurrencySerializer(currencies, many=True)

        return Response({
            'data': currencies_serialized.data,
            'metadata': {
                'total': len(currencies)
            }
        }) 
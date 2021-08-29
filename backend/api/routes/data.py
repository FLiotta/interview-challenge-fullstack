from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from ..models import Currency
from ..serializers import CurrencySerializer

class CurrencyAPI(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        currencies = Currency.objects.all().order_by('id')
        currencies_serialized = CurrencySerializer(currencies, many=True)

        return Response({
            'data': currencies_serialized.data,
            'metadata': {
                'total': len(currencies)
            }
        }) 
    
    def post(self, request):
        currency_name = request.data['name']
        currency_symbol = request.data['symbol']

        new_currency_payload = {
            "name": currency_name,
            "symbol": currency_symbol
        }

        new_currency = CurrencySerializer(data=new_currency_payload)

        if new_currency.is_valid():
            new_currency.save()

            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({
                "error": "Currency can't be created",
                "message": "Please revalidate the parameters sent",
                "data": new_currency.errors
            })

class CurrencyDetailAPI(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request, currency_id):
        currency = Currency.objects.get(id=currency_id)
        currency_serialized = CurrencySerializer(currency)

        return Response({
            "data": currency_serialized.data
        })

    def patch(self, request, currency_id):
        new_name = request.data.get('name')
        new_symbol = request.data.get('symbol')

        currency = Currency.objects.get(id=currency_id)

        if new_name is None and new_symbol is None:
            return Response({
                "error": "Missing params"
            }, status=status.HTTP_400_BAD_REQUEST)

        if new_name is not None:
            currency.name = new_name
        if new_symbol is not None:
            currency.symbol = new_symbol

        currency.save()

        return Response()
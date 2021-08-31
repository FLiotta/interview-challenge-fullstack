from django.test import TestCase
from django.contrib.auth.models import User
from .models import Currency, Account
from datetime import datetime
from rest_framework_simplejwt.tokens import RefreshToken

class BaseTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.user_2 = User.objects.create_user(username='testuser1', password='123456')

        self.currency = Currency.objects.create(symbol="$", name="Simoleon")
        self.currency_euro = Currency.objects.create(symbol="€", name="Euro")

        self.account = Account.objects.create(
            owner_id=self.user.id,
            currency_id=self.currency.id,
            name="Wallet Test",
            funds=50,
            deposit_address="MKQWEROXQAS"
        )

        self.account_2 = Account.objects.create(
            owner_id=self.user_2.id,
            currency_id=self.currency.id,
            name="Wallet Test 2",
            funds=0,
            deposit_address="MKQWEXXQ1ROXQAS"
        )

        self.account_3 = Account.objects.create(
            owner_id=self.user_2.id,
            currency_id=self.currency_euro.id,
            name="Wallet Test 3 euro",
            funds=0,
            deposit_address="MKQWXQWEXQAS"
        )

        self.currency.save()
        self.currency_euro.save()
        self.user.save()
        self.user_2.save()
        self.account.save()
        self.account_2.save()
        self.account_3.save()

        tokens = RefreshToken.for_user(self.user)

        self.token = str(tokens)
        self.refresh_token = str(tokens.access_token)

        self.client.defaults["HTTP_AUTHORIZATION"] = "Bearer " + self.refresh_token

class ProfileViewTest(BaseTest):        
    def test_get_profile(self):
        response = self.client.get('/api/profile')

        self.assertEqual(response.status_code, 200)

class CurrenciesViewTest(BaseTest):
    def test_get_currencies(self):
        response = self.client.get("/api/data/currencies")
        self.assertEqual(response.status_code, 200)
    
    def test_create_currency(self):
        new_currency_payload = {
            "name": "Simoleones",
            "symbol": "$"
        }

        response = self.client.post("/api/data/currencies", new_currency_payload)

        self.assertEqual(response.status_code, 201)
    def test_failed_create_currency_no_name(self):
        new_currency_payload = {
            "symbol": "$"
        }

        response = self.client.post("/api/data/currencies", new_currency_payload)

        self.assertEqual(response.status_code, 400)

    def test_failed_create_currency_no_symbol(self):
        new_currency_payload = {
            "name": "Simoleones"
        }

        response = self.client.post("/api/data/currencies", new_currency_payload)

        self.assertEqual(response.status_code, 400)

class CurrenciesDetailViewTest(BaseTest):
    def test_get_currency_detail(self):
        path = '/api/data/currencies/{0}'.format(self.currency.id)
        response = self.client.get(path)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {
            "data": {
                "id": self.currency.id,
                "name": self.currency.name,
                "symbol": self.currency.symbol
            }
        })

    def test_patch_currency_detail(self):
        path = '/api/data/currencies/{0}'.format(self.currency.id)
        patch_currency_payload = {
            "name": "renamed_",
            "symbol": "€"
        }

        response = self.client.patch(path, patch_currency_payload, content_type='application/json')

        self.assertEqual(response.status_code, 200)
    
    def test_patch_currency_detail_fail(self):
        path = '/api/data/currencies/{0}'.format(self.currency.id)
        patch_currency_payload = {}

        response = self.client.patch(path, patch_currency_payload, content_type='application/json')

        self.assertEqual(response.status_code, 400)

class AccountViewTest(BaseTest):
    def test_get_accounts(self):
        response = self.client.get('/api/account')

        self.assertEqual(response.status_code, 200)
    
    def test_create_account(self):
        new_account_payload = {
            "name": "prueba wallet test case",
            "currency_id": self.currency.id
        }
        
        response = self.client.post('/api/account', new_account_payload)

        self.assertEqual(response.status_code, 200)
    
    def test_create_account_fail_missing_currency(self):
        new_account_payload = {
            "name": "prueba wallet 2",
        }
        
        response = self.client.post('/api/account', new_account_payload)

        self.assertEqual(response.status_code, 400)

class AccountDetailViewTest(BaseTest):
    def test_get_account_detail(self):
        path = '/api/account/{0}'.format(self.account.id)
        response = self.client.get(path)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {
            "data": {
                "created_at": self.account.created_at.strftime("%Y-%m-%d"),
                "updated_at": self.account.updated_at.strftime("%Y-%m-%d"),
                "currency": {
                    "id": self.account.currency.id,
                    "name": self.account.currency.name,
                    "symbol": self.account.currency.symbol,
                },
                "deposit_address": self.account.deposit_address,
                "funds": self.account.funds,
                "id": self.account.id,
                "name": self.account.name,
                "owner_id": self.account.owner_id,
            }
        })

class AccountOperationsViewTest(BaseTest):
    def test_get_operations(self):
        path = "/api/account/{0}/operations".format(self.account.id)

        response = self.client.get(path)

        self.assertEqual(response.status_code, 200)

    def test_get_operations_fail_others(self):
        """
            An user should't be allowed to request others accounts.
        """

        path = "/api/account/{0}/operations".format(self.account_2.id)

        response = self.client.get(path)

        self.assertEqual(response.status_code, 403)
    
class AccountSendViewTest(BaseTest):
    def test_send_between_same_currency_accounts(self):
        path = "/api/account/{0}/send".format(self.account.id)

        transaction_payload = {
            "amount": self.account.funds,
            "deposit_address": self.account_2.deposit_address
        }

        response = self.client.post(path, transaction_payload)

        self.assertEqual(response.status_code, 200)

    def test_send_fails_between_different_currency_accounts(self):
        path = "/api/account/{0}/send".format(self.account.id)

        transaction_payload = {
            "amount": 50,
            "deposit_address": self.account_3.deposit_address
        }

        response = self.client.post(path, transaction_payload)

        self.assertEqual(response.status_code, 400)

    def test_send_fails_insufficent_funds_account(self):
        path = "/api/account/{0}/send".format(self.account.id)

        transaction_payload = {
            "amount": 1500,
            "deposit_address": self.account_2.deposit_address
        }

        response = self.client.post(path, transaction_payload)

        self.assertEqual(response.status_code, 400)

    def test_send_fails_same_account(self):
        path = "/api/account/{0}/send".format(self.account.id)

        transaction_payload = {
            "amount": 25,
            "deposit_address": self.account.deposit_address
        }

        response = self.client.post(path, transaction_payload)

        self.assertEqual(response.status_code, 400)

    def test_send_fails_manage_others_account(self):
        """
            Trying to manage other's account.
        """
        path = "/api/account/{0}/send".format(self.account_2.id)

        transaction_payload = {
            "amount": 25,
            "deposit_address": self.account.deposit_address
        }

        response = self.client.post(path, transaction_payload)

        self.assertEqual(response.status_code, 403)


class AccountDepositViewTest(BaseTest):
    def test_deposit_on_account(self):
        path = "/api/account/{0}/deposit".format(self.account.id)

        transaction_payload = {
            "amount": 500
        }

        response = self.client.patch(path, transaction_payload, content_type='application/json')

        self.assertEqual(response.status_code, 200)
    
    def test_fail_deposit_others_account(self):
        path = "/api/account/{0}/deposit".format(self.account_2.id)

        transaction_payload = {
            "amount": 500
        }

        response = self.client.patch(path, transaction_payload, content_type='application/json')

        self.assertEqual(response.status_code, 403)
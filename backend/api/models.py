from __future__ import annotations

from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User

class Currency(models.Model):
    name = models.CharField(max_length=25, null=False, unique=True)
    symbol = models.CharField(max_length=5, default="$")

    class Meta:
        db_table = "currency"

    def __str__(self):
        return self.name

class Account(models.Model):
    name = models.CharField(max_length=25, null=True)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False)
    currency = models.ForeignKey(Currency, on_delete=models.DO_NOTHING, null=False)
    funds = models.PositiveIntegerField(null=True, default=0)
    deposit_address = models.CharField(max_length=100, null=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        db_table = "account"
    
    def __str__(self):
        return self.name

    def get_operations(self, limit=10, offset=0):
        starts_at = offset * limit
        ends_at = starts_at + limit

        query = Operation.objects \
            .filter(Q(receiver_account_id=self.id) | Q(sender_account_id=self.id))

        operations = query.order_by('-id')[starts_at:ends_at]
        operations_count = query.count()

        return {
            "operations": operations,
            "count": operations_count
        }


class Operation(models.Model):
    OPERATION_TYPES = [
        ("transfer", "transfer"),
        ("deposit", "deposit")
    ]

    sender_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=True, related_name="sender_account")
    receiver_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=False, blank=True, related_name="receiver_account")
    currency = models.ForeignKey(Currency, on_delete=models.DO_NOTHING, null=False)
    operation_type = models.CharField(max_length=50, null=False, choices=OPERATION_TYPES)
    amount = models.PositiveIntegerField(null=False)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "operation"
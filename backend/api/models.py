from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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


    class Meta:
        db_table = "account"
    
    def __str__(self):
        return self.name

class Operation(models.Model):
    sender_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=False, related_name="sender_account")
    receiver_account = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=False, related_name="receiver_account")
    currency = models.ForeignKey(Currency, on_delete=models.DO_NOTHING, null=False)
    amount = models.PositiveIntegerField(null=False)

    class Meta:
        db_table = "operation"
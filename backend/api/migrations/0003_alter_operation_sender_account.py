# Generated by Django 3.2.6 on 2021-08-28 02:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_operation_operation_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='operation',
            name='sender_account',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='sender_account', to='api.account'),
        ),
    ]

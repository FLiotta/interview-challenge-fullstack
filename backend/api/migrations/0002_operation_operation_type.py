# Generated by Django 3.2.6 on 2021-08-28 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='operation',
            name='operation_type',
            field=models.CharField(choices=[('transfer', 'transfer'), ('deposit', 'deposit')], default='transfer', max_length=50),
            preserve_default=False,
        ),
    ]
# Generated by Django 4.1.3 on 2023-01-21 17:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contracts', '0003_contract_is_active_alter_contracttype_contract_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='end_date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='contract',
            name='start_date',
            field=models.DateField(default=datetime.date(2023, 1, 21)),
        ),
    ]
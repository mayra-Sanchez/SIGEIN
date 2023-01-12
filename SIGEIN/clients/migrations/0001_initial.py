# Generated by Django 4.1.3 on 2023-01-09 21:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0009_alter_userroles_role'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('national_id', models.PositiveIntegerField(unique=True)),
                ('person_type', models.CharField(choices=[('natural', 'natural'), ('juridica', 'juridica')], max_length=20)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('users.customuser',),
        ),
    ]

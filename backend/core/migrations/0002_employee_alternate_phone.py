# Generated by Django 3.2.4 on 2021-06-12 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='alternate_phone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]

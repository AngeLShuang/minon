# Generated by Django 2.1.1 on 2018-10-14 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20181014_1210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useryzm',
            name='dxtime',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
# Generated by Django 2.1.1 on 2018-10-16 06:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic', '0003_dynamiccommentpicuture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dynamiccommentpicuture',
            name='dynamiccomid',
            field=models.ForeignKey(blank=True, db_column='dynamiccomId', null=True, on_delete=django.db.models.deletion.CASCADE, to='dynamic.DynamicComment'),
        ),
    ]

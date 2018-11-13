# Generated by Django 2.1.1 on 2018-10-16 06:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic', '0002_auto_20181016_1401'),
    ]

    operations = [
        migrations.CreateModel(
            name='DynamiccommentPicuture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picturesrc', models.TextField(blank=True, null=True)),
                ('dynamiccomid', models.ForeignKey(blank=True, db_column='dynamiccomId', null=True, on_delete=django.db.models.deletion.CASCADE, to='dynamic.DynamicLabel')),
            ],
            options={
                'db_table': 'dynamiccom_picuture',
            },
        ),
    ]

# Generated by Django 2.1.1 on 2018-10-08 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cookbookintroduce',
            name='baseid',
            field=models.ForeignKey(db_column='baseId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic'),
        ),
        migrations.AlterField(
            model_name='cookbookintroduce',
            name='styleid',
            field=models.ForeignKey(db_column='styleId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookStyle'),
        ),
        migrations.AlterField(
            model_name='cookbookintroduce',
            name='tasteid',
            field=models.ForeignKey(db_column='tasteId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookTaste'),
        ),
    ]

# Generated by Django 2.1.1 on 2018-10-17 11:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_userinform_usersign'),
        ('cookbook', '0008_cookbookfoodintro_gongxiao'),
    ]

    operations = [
        migrations.CreateModel(
            name='CookbookCheck',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(db_column='time', null=True)),
                ('state', models.CharField(blank=True, db_column='state', max_length=2, null=True)),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
                ('userphone', models.ForeignKey(db_column='userPhone', null=True, on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone')),
            ],
            options={
                'db_table': 'cookbook_check',
            },
        ),
    ]

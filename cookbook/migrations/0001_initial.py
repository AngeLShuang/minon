# Generated by Django 2.1.1 on 2018-10-08 10:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CookbookBasic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cookbookpictures', models.CharField(db_column='cookbookPictures', max_length=255)),
                ('cookbookname', models.CharField(db_column='cookbookName', max_length=20)),
                ('belongto', models.CharField(blank=True, db_column='belongTo', max_length=255, null=True)),
            ],
            options={
                'db_table': 'cookbook_basic',
            },
        ),
        migrations.CreateModel(
            name='CookbookBrowse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('browsetime', models.DateTimeField(auto_now_add=True, db_column='browseTime')),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
                ('userphone', models.ForeignKey(db_column='userPhone', on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone')),
            ],
            options={
                'db_table': 'cookbook_browse',
            },
        ),
        migrations.CreateModel(
            name='CookbookCbfood',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodzhu', models.CharField(blank=True, max_length=255, null=True)),
                ('foodfu', models.CharField(blank=True, max_length=255, null=True)),
                ('cookbookid', models.ForeignKey(blank=True, db_column='cookbookId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
            ],
            options={
                'db_table': 'cookbook_cbfood',
            },
        ),
        migrations.CreateModel(
            name='CookbookCollection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collectiontime', models.DateField(auto_now_add=True, db_column='collectionTime')),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
                ('userphone', models.ForeignKey(db_column='userPhone', on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone')),
            ],
            options={
                'db_table': 'cookbook_collection',
            },
        ),
        migrations.CreateModel(
            name='CookbookComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commentcontent', models.TextField(blank=True, db_column='commentContent', null=True)),
                ('commentlastcontent', models.ForeignKey(blank=True, db_column='commentLastContent', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookComment')),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', null=True, on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
                ('userphone', models.ForeignKey(db_column='userPhone', on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone')),
            ],
            options={
                'db_table': 'cookbook_comment',
            },
        ),
        migrations.CreateModel(
            name='CookbookFoodintro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodname', models.CharField(max_length=50)),
                ('foodintro', models.TextField(blank=True, db_column='foodIntro', null=True)),
                ('foodnickname', models.CharField(blank=True, max_length=255, null=True)),
                ('goodfor', models.TextField(blank=True, null=True)),
                ('badfor', models.TextField(blank=True, null=True)),
                ('yingyangjiazhi', models.TextField(blank=True, null=True)),
                ('shiyongxiaguo', models.TextField(blank=True, null=True)),
                ('xuangou', models.TextField(blank=True, null=True)),
                ('chucun', models.TextField(blank=True, null=True)),
                ('xiaojiqiao', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'cookbook_foodintro',
            },
        ),
        migrations.CreateModel(
            name='CookbookIntroduce',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploadtime', models.DateTimeField(blank=True, db_column='uploadTime', null=True)),
                ('totalpictures', models.TextField(db_column='totalPictures')),
                ('detailintroduce', models.TextField(blank=True, db_column='detailIntroduce', null=True)),
                ('efficacy', models.CharField(blank=True, max_length=255, null=True)),
                ('cookbookgoodnum', models.IntegerField(blank=True, db_column='cookbookgoodNum', null=True)),
                ('cookbookbadnum', models.IntegerField(blank=True, db_column='cookbookbadNum', null=True)),
                ('admincheck', models.IntegerField(blank=True, db_column='adminCheck', null=True)),
                ('baseid', models.ForeignKey(db_column='baseId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
            ],
            options={
                'db_table': 'cookbook_introduce',
            },
        ),
        migrations.CreateModel(
            name='CookbookLabel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(blank=True, max_length=255, null=True)),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
            ],
            options={
                'db_table': 'cookbook_label',
            },
        ),
        migrations.CreateModel(
            name='CookbookMarche',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stepnumber', models.CharField(blank=True, db_column='stepNumber', max_length=20, null=True)),
                ('picturesrc', models.CharField(blank=True, max_length=255, null=True)),
                ('stepcontent', models.TextField(blank=True, db_column='stepContent', null=True)),
                ('cookbookid', models.ForeignKey(db_column='cookbookId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookBasic')),
            ],
            options={
                'db_table': 'cookbook_marche',
            },
        ),
        migrations.CreateModel(
            name='CookbookStepupdate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True, null=True)),
                ('updatetime', models.DateField(auto_now_add=True, db_column='updateTime')),
                ('isallow', models.IntegerField(blank=True, db_column='isAllow', null=True)),
                ('stepid', models.ForeignKey(db_column='stepId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookMarche')),
                ('userphone', models.ForeignKey(db_column='userPhone', on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone')),
            ],
            options={
                'db_table': 'cookbook_stepupdate',
            },
        ),
        migrations.CreateModel(
            name='CookbookStyle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stylename', models.CharField(blank=True, db_column='styleName', max_length=50, null=True)),
            ],
            options={
                'db_table': 'cookbook_style',
            },
        ),
        migrations.CreateModel(
            name='CookbookTaste',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tastelabel', models.CharField(blank=True, db_column='tasteLabel', max_length=50, null=True)),
            ],
            options={
                'db_table': 'cookbook_taste',
            },
        ),
        migrations.AddField(
            model_name='cookbookintroduce',
            name='styleid',
            field=models.ForeignKey(db_column='styleId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookStyle'),
        ),
        migrations.AddField(
            model_name='cookbookintroduce',
            name='tasteid',
            field=models.ForeignKey(db_column='tasteId', on_delete=django.db.models.deletion.CASCADE, to='cookbook.CookbookTaste'),
        ),
        migrations.AddField(
            model_name='cookbookintroduce',
            name='userphone',
            field=models.ForeignKey(db_column='userPhone', on_delete=django.db.models.deletion.CASCADE, to='user.UserLogin', to_field='userphone'),
        ),
        migrations.AlterUniqueTogether(
            name='cookbookcollection',
            unique_together={('userphone', 'cookbookid')},
        ),
    ]

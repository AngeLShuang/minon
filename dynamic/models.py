from django.db import models
from user.models import UserLogin

class DynamicComment(models.Model):
    dynamicid = models.ForeignKey(db_column='dynamicId',to='UserDynamic',to_field='id',on_delete=models.CASCADE,blank=True, null=True)  # Field name made lowercase.
    firstcomment = models.ForeignKey(db_column='firstcomment',to='DynamicComment',to_field='id',on_delete=models.CASCADE,blank=True, null=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    time = models.DateField(blank=True, null=True,auto_now_add=True)
    userphone = models.ForeignKey(db_column='userPhone',to='user.UserLogin',to_field='userphone',on_delete=models.CASCADE)

    class Meta:
        db_table = 'dynamic_comment'


class DynamicLabel(models.Model):
    dynamicid = models.ForeignKey(db_column='dynamicId',to='UserDynamic',to_field='id',on_delete=models.CASCADE,blank=True, null=True)  # Field name made lowercase.
    label = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'dynamic_label'


class DynamiccommentPicuture(models.Model):
    picturesrc = models.TextField(blank=True, null=True)
    dynamiccomid = models.ForeignKey(db_column='dynamiccomId',to='DynamicComment',to_field='id',on_delete=models.CASCADE,blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'dynamiccom_picuture'


class UserDynamic(models.Model):
    userphone = models.ForeignKey(db_column='userPhone',to='user.UserLogin',to_field='userphone',on_delete=models.CASCADE)  # Field name made lowercase.
    content = models.TextField(blank=True, null=True)
    time = models.DateField(blank=True, null=True,auto_now_add=True)
    picuture = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'user_dynamic'
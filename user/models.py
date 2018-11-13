# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models




class UserExperience(models.Model):
    experience = models.IntegerField(blank=True, null=True)
    userphone = models.ForeignKey(to='UserLogin',to_field='userphone',on_delete=models.CASCADE)  # Field name made lowercase.

    class Meta:
        db_table = 'user_experience'


class UserFans(models.Model):
    phone = models.ForeignKey(db_column='userPhone',to='UserLogin',related_name='att',to_field='userphone',on_delete=models.ForeignKey)
    beattephone = models.ForeignKey(db_column='beAtteUserPhone',to='UserLogin',related_name='beatt',to_field='userphone',on_delete=models.ForeignKey)  # Field name made lowercase.
    fanstime = models.DateField(db_column='fansTime',auto_now_add=True)  # Field name made lowercase.

    class Meta:
        db_table = 'user_fans'
        unique_together = (('phone', 'beattephone'),)


class UserHeadportrait(models.Model):
    picture = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'user_headportrait'


class UserInform(models.Model):
    userphone =models.ForeignKey(to='UserLogin',to_field='userphone',on_delete=models.CASCADE)  # Field name made lowercase.
    usernickname = models.CharField(db_column='userNickname', max_length=18, blank=True, null=True)  # Field name made lowercase.
    useremail = models.CharField(db_column='userEmail', max_length=50, blank=True, null=True)  # Field name made lowercase.
    userbriday = models.DateField(db_column='userBriday', blank=True, null=True)  # Field name made lowercase.
    userprovince = models.CharField(db_column='userProvince', max_length=30, blank=True, null=True)  # Field name made lowercase.
    usercity = models.CharField(db_column='userCity', max_length=30, blank=True, null=True)  # Field name made lowercase.
    professionid = models.ForeignKey(db_column='professionId',to='UserOccupation',to_field='id',on_delete=models.CASCADE,blank=True, null=True)  # Field name made lowercase.
    headportraitid = models.ForeignKey(db_column='headPortraitId',to='UserHeadportrait',to_field='id',on_delete=models.CASCADE,blank=True, null=True)  # Field name made lowercase.
    usersex = models.CharField(db_column='userSex',max_length=1,blank=True, null=True)  # Field name made lowercase.
    usersign = models.CharField(db_column='usersign',max_length=255,blank=True, null=True)  # Field name made lowercase.
    class Meta:
        db_table = 'user_inform'

class UserYzm(models.Model):
    telephone=models.CharField(primary_key=True,max_length=11)
    dx=models.CharField(max_length=6,null=True)
    dxtime=models.CharField(max_length=255,null=True)
    class Meta:
        db_table='user_yzm'

class UserLogin(models.Model):
    userphone = models.CharField(db_column='userPhone', unique=True, max_length=11)  # Field name made lowercase.
    userpassword = models.CharField(db_column='userPassword', max_length=100)  # Field name made lowercase.
    isadmin = models.CharField(max_length=20, blank=True, null=True)
    usernewlogintime = models.DateTimeField(db_column='userNewLoginTime', blank=True, null=True,auto_now=True)  # Field name made lowercase.
    registtime = models.DateTimeField(db_column='registTime',auto_now_add=True)  # Field name made lowercase.
    telephone = models.CharField(max_length=11, blank=True, null=True)

    class Meta:
        db_table = 'user_login'


class UserOccupation(models.Model):
    occupation = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'user_occupation'


class UserSignin(models.Model):
    userphone = models.ForeignKey(to='UserLogin',to_field='userphone',on_delete=models.ForeignKey)  # Field name made lowercase.
    newsigntime = models.DateField(db_column='newSignTime', blank=True, null=True,auto_now=True)  # Field name made lowercase.
    lastsigntime = models.DateField(db_column='lastSignTime', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'user_signin'

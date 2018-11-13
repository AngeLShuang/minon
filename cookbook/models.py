from django.db import models
from user.models import UserLogin


# class BbsCollection(models.Model):
#     postid = models.IntegerField(db_column='postId')  # Field name made lowercase.
#     userphone = models.CharField(db_column='userPhone', primary_key=True, max_length=11)  # Field name made lowercase.
#     collecttime = models.DateField(db_column='collectTime')  # Field name made lowercase.
#
#     class Meta:
#         db_table = 'bbs_collection'
#         unique_together = (('userphone', 'postid'),)
#
#
# class BbsComment(models.Model):
#     invitationid = models.IntegerField(db_column='invitationId', blank=True, null=True)  # Field name made lowercase.
#     userphone = models.CharField(db_column='userPhone', max_length=11)  # Field name made lowercase.
#     firstcomment = models.IntegerField(db_column='firstComment', blank=True, null=True)  # Field name made lowercase.
#     uploadtime = models.DateField(db_column='uploadTime')  # Field name made lowercase.
#
#     class Meta:
#         db_table = 'bbs_comment'
#
#
# class BbsInvitation(models.Model):
#     userphone = models.CharField(db_column='userPhone', max_length=11)  # Field name made lowercase.
#     headline = models.CharField(max_length=255)
#     themeid = models.IntegerField(db_column='themeId')  # Field name made lowercase.
#     uploadtime = models.DateField(db_column='uploadTime')  # Field name made lowercase.
#     content = models.CharField(max_length=255, blank=True, null=True)
#
#     class Meta:
#         db_table = 'bbs_invitation'
#
#
# class BbsTheme(models.Model):
#     themename = models.CharField(db_column='themeName', max_length=255)  # Field name made lowercase.
#
#     class Meta:
#         db_table = 'bbs_theme'


class CookbookBasic(models.Model):
    cookbookpictures = models.CharField(db_column='cookbookPictures', max_length=255)  # Field name made lowercase.
    cookbookname = models.CharField(db_column='cookbookName', max_length=20)  # Field name made lowercase.
    belongto = models.CharField(db_column='belongTo', max_length=255, blank=True,
                                null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_basic'


class CookbookBrowse(models.Model):
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id',
                                   on_delete=models.CASCADE)  # Field name made lowercase.
    userphone = models.ForeignKey(db_column='userPhone', to='user.UserLogin', to_field='userphone',
                                  on_delete=models.CASCADE)  # Field name made lowercase.
    browsetime = models.DateTimeField(db_column='browseTime', auto_now_add=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_browse'


class CookbookCbfood(models.Model):
    foodzhu = models.CharField(max_length=255, blank=True, null=True)
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id', on_delete=models.CASCADE,
                                   blank=True, null=True)  # Field name made lowercase.
    foodfu = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'cookbook_cbfood'


class CookbookCollection(models.Model):
    userphone = models.ForeignKey(db_column='userPhone', to='user.UserLogin', to_field='userphone',
                                  on_delete=models.CASCADE)  # Field name made lowercase.
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id', on_delete=models.CASCADE,
                                   null=True)  # Field name made lowercase.
    collectiontime = models.DateField(db_column='collectionTime', auto_now_add=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_collection'
        unique_together = (('userphone', 'cookbookid'),)


class CookbookComment(models.Model):
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id', on_delete=models.CASCADE,
                                   null=True)
    userphone = models.ForeignKey(db_column='userPhone', to='user.UserLogin', to_field='userphone',
                                  on_delete=models.CASCADE)
    commentlastcontent = models.ForeignKey(db_column='commentLastContent', to='CookbookComment', to_field='id',
                                           on_delete=models.CASCADE, blank=True,
                                           null=True)  # Field name made lowercase.
    commentcontent = models.TextField(db_column='commentContent', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_comment'



class CookbookFoodintro(models.Model):
    foodname = models.CharField(max_length=50)
    gongxiao = models.CharField(max_length=50,null=True)
    foodintro = models.TextField(db_column='foodIntro', blank=True, null=True)  # Field name made lowercase.
    foodnickname = models.CharField(max_length=255, blank=True, null=True)
    goodfor = models.TextField(blank=True, null=True)
    badfor = models.TextField(blank=True, null=True)
    yingyangjiazhi = models.TextField(blank=True, null=True)
    shiyongxiaguo = models.TextField(blank=True, null=True)
    xuangou = models.TextField(blank=True, null=True)
    chucun = models.TextField(blank=True, null=True)
    xiaojiqiao = models.TextField(blank=True, null=True)
    foodsrc=models.TextField(db_column='foodsrc',null=True)
    class Meta:
        db_table = 'cookbook_foodintro'


class CookbookIntroduce(models.Model):
    userphone = models.ForeignKey(db_column='userPhone', to='user.UserLogin', to_field='userphone',
                                  on_delete=models.CASCADE)  # Field name made lowercase.
    styleid = models.ForeignKey(db_column='styleId', to='CookbookStyle', to_field='id', on_delete=models.CASCADE,
                                null=True)  # Field name made lowercase.
    tasteid = models.ForeignKey(db_column='tasteId', to='CookbookTaste', to_field='id', on_delete=models.CASCADE,
                                null=True)  # Field name made lowercase.
    baseid = models.ForeignKey(db_column='baseId', to='CookbookBasic', to_field='id', on_delete=models.CASCADE,
                               null=True)  # Field name made lowercase.
    uploadtime = models.DateTimeField(db_column='uploadTime', blank=True, null=True)  # Field name made lowercase.
    totalpictures = models.TextField(db_column='totalPictures')  # Field name made lowercase.
    detailintroduce = models.TextField(db_column='detailIntroduce', blank=True, null=True)  # Field name made lowercase.
    efficacy = models.CharField(max_length=255, blank=True, null=True)
    cookbookgoodnum = models.IntegerField(db_column='cookbookgoodNum', blank=True,
                                          null=True)  # Field name made lowercase.
    cookbookbadnum = models.IntegerField(db_column='cookbookbadNum', blank=True,
                                         null=True)  # Field name made lowercase.
    admincheck = models.IntegerField(db_column='adminCheck', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_introduce'


class CookbookLabel(models.Model):
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id',
                                   on_delete=models.CASCADE)  # Field name made lowercase.
    label = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'cookbook_label'


class CookbookMarche(models.Model):
    cookbookid = models.ForeignKey(db_column='cookbookId', to='CookbookBasic', to_field='id',
                                   on_delete=models.CASCADE)  # Field name made lowercase.
    stepnumber = models.CharField(db_column='stepNumber', max_length=20, blank=True,
                                  null=True)  # Field name made lowercase.
    picturesrc = models.CharField(max_length=255, blank=True, null=True)
    stepcontent = models.TextField(db_column='stepContent', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_marche'


class CookbookStepupdate(models.Model):
    stepid = models.ForeignKey(db_column='stepId', to='CookbookMarche', to_field='id',
                               on_delete=models.CASCADE)  # Field name made lowercase.
    content = models.TextField(blank=True, null=True)
    userphone = models.ForeignKey(db_column='userPhone',related_name='phone', to='user.UserLogin', to_field='userphone',
                                  on_delete=models.CASCADE,null=True)  # Field name made lowercase.
    updatetime = models.DateField(db_column='updateTime', auto_now_add=True)  # Field name made lowercase.
    pic = models.TextField(db_column='pic',null=True)
    isallow = models.IntegerField(db_column='isAllow', blank=True, null=True)  # Field name made lowercase.
    phone=models.ForeignKey(db_column='phone',to='user.UserLogin',related_name='heuserphone',to_field='userphone',on_delete=models.CASCADE,null=True)
    class Meta:
        db_table = 'cookbook_stepupdate'


class CookbookStyle(models.Model):
    stylename = models.CharField(db_column='styleName', max_length=50, blank=True,
                                 null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_style'


class CookbookTaste(models.Model):
    tastelabel = models.CharField(db_column='tasteLabel', max_length=50, blank=True,
                                  null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'cookbook_taste'


class CookbookIndex(models.Model):
    cookbookid=models.ForeignKey(db_column='cookbookid',to='CookbookBasic',to_field='id',on_delete=models.CASCADE,null=True)
    src=models.TextField(db_column='src',null=True)
    title=models.CharField(db_column='title',max_length=255,null=True)
    time=models.DateTimeField(db_column='uploadtime',null=True,auto_now_add=True)
    pic=models.TextField(db_column='pic',null=True)
    class Meta:
        db_table = 'cookbook_index'

class CookbookChange(models.Model):
    stepid = models.ForeignKey(db_column='stepId', to='CookbookMarche', to_field='id',
                               on_delete=models.CASCADE)  # Field name made lowercase.
    content = models.TextField(blank=True, null=True)
    userphone = models.ForeignKey(db_column='userPhone', related_name='myphone', to='user.UserLogin',
                                  to_field='userphone',
                                  on_delete=models.CASCADE, null=True)  # Field name made lowercase.
    updatetime = models.DateField(db_column='updateTime', auto_now_add=True)  # Field name made lowercase.
    pic = models.TextField(db_column='pic', null=True)
    isread = models.IntegerField(db_column='isRead', blank=True, null=True)  # Field name made lowercase.
    phone = models.ForeignKey(db_column='phone', to='user.UserLogin', related_name='hephone', to_field='userphone',
                              on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'cookbook_change'
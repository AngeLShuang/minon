from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views

app_name= 'user'
urlpatterns = [
    url(r'^$',views.userindex,name='user'),

    # url(r'^getimgcook/',views.getimgcook,name='getimgcook'),

    url(r'^login/',views.login,name='login'),
    url(r'^getduanxinyz/',views.getduanxinyz,name='getduanxinyz'),
    url(r'^chklogin/',views.chklogin,name='chklogin'),
    url(r'^getuser/',views.getuser,name='getuser'),
    url(r'^getCookBookUser/',views.getCookBookUser,name='getCookBookUser'),
    url(r'^Forgit/',views.Forgit,name='Forgit'),
    url(r'^regist/',views.regist,name='regist'),
    url(r'^getimgtoken/',views.getimgtoken,name='getimgtoken'),
    url(r'^getimgtokens/',views.getimgtokens,name='getimgtokens'),
    url(r'^getUserByuserPhone/',views.getUserByuserPhone,name='getUserByuserPhone'),
    url(r'^getUserAllMessageByuserPhone/',views.getUserAllMessageByuserPhone,name='getUserAllMessageByuserPhone'),
    url(r'^setUserMessageByuserPhone/',views.setUserMessageByuserPhone,name='setUserMessageByuserPhone'),
    url(r'^changeUserPassword/',views.changeUserPassword,name='changeUserPassword'),
    url(r'^checkYzm/',views.checkYzm,name='checkYzm'),
    url(r'^changeUserTelephone/',views.changeUserTelephone,name='changeUserTelephone'),
    url(r'^changeUserNickname/',views.changeUserNickname,name='changeUserNickname'),
    url(r'^getUserCookbook/',views.getUserCookbook,name='getUserCookbook'),
    url(r'^getUserFans/',views.getUserFans,name='getUserFans'),
    url(r'^getFans/',views.getFans,name='getFans'),
    url(r'^getUserCollection/',views.getUserCollection,name='getUserCollection'),
    url(r'^userSignin/',views.userSignin,name='userSignin'),
    url(r'^guanzhuUser/',views.guanzhuUser,name='guanzhuUser'),
    url(r'^reguanzhuUser/',views.reguanzhuUser,name='reguanzhuUser'),

    url(r'^getYiShenheOther/',views.getYiShenheOther,name='getYiShenheOther'),
    url(r'^getDetailedChe/',views.getdetailedche,name='getDetailedChe'),
    url(r'^getWeiShenheOther/',views.getWeiShenheOther,name='getWeiShenheOther'),
    url(r'^agreeUpdateStep/',views.agreeUpdateStep,name='agreeUpdateStep'),
    url(r'^notagreeUpdateStep/',views.notagreeUpdateStep,name='notagreeUpdateStep'),

    url(r'^delCaipu/', views.delCaipu, name='delCaipu'),
    url(r'^compileCaipu',views.compileCaipu, name='compilecaipu'),

]

from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views

app_name= "dynamic"
urlpatterns = [
    url(r'^$',views.dynamicindex,name='dynamic'),

    url(r'^getdynamic/',views.getdynamic,name='getdynamic'),
    url(r'^getdynamicall/',views.getdynamicall,name='getdynamicall'),
    url(r'^getdynamicCollection/',views.getdynamicCollection,name='getdynamicCollection'),
    url(r'^getdynamicbeSee/',views.getdynamicbeSee,name='getdynamicbeSee'),
    url(r'^getdynamicbegood/',views.getdynamicbegood,name='getdynamicbegood'),
    url(r'^setdynagood/',views.setdynagood,name='setdynagood'),
    url(r'^getdynam/',views.getdynam,name='getdynam'),
    url(r'^setCollectting/',views.setCollectting,name='setCollectting'),
    url(r'^getUserDynamic/',views.getUserDynamic,name='getUserDynamic'),
    url(r'^getUserDynamicper/',views.getUserDynamicper,name='getUserDynamicper'),
    url(r'^getDynamicomm/',views.getDynamicomm,name='getDynamicomm'),
    url(r'^setDynamicComm/',views.setDynamicComm,name='setDynamicComm'),
    url(r'^setDynamicCommyuan/',views.setDynamicCommyuan,name='setDynamicCommyuan'),
    url(r'^publishDynamic/', views.publishDynamic, name='publishDynamic'),
    url(r'^getUserDynam/', views.getUserDynam, name='getUserDynam'),
    url(r'^updateUserDynamic/', views.updateUserDynamic, name='updateUserDynamic'),
    url(r'^delUserDynamic/', views.delUserDynamic, name='delUserDynamic'),

]
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views

app_name='admin_ser'
urlpatterns = [
    url(r'^$',views.adminindex,name='admin_ser'),
    url(r'^login/',views.adminlogin,name='admin_login'),
    url(r'^getadminmessage/',views.getadminmessage,name='admin_mess'),
]

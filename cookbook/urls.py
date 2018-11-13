from django.conf.urls import url

from . import views
app_name='cookbook'

urlpatterns = [
    url(r'^$',views.cookbookindex,name='cookbook'),

    url(r'^cookbookbrowl/',views.cookbookbrowl,name='cookbookbrowl'),

    url(r'^getckBaseMessage/',views.getckBaseMessage,name='getckBaseMessage'),
    url(r'^getckAllMessage/',views.getckAllMessage,name='getckAllMessage'),
    url(r'^getindex/',views.getindex,name='getindex'),
    url(r'^changeBuzou/',views.changeBuzou,name='changeBuzou'),
    url(r'^getfoodMessage/',views.getfoodMessage,name='getfoodMessage'),
    url(r'^getsgicaibuzou/',views.getsgicaibuzou,name='getsgicaibuzou'),
    url(r'^getfooduser/',views.getfooduser,name='getfooduser'),
    url(r'^collectCk/',views.collectCk,name='collectCk'),
    url(r'^uploadCk/',views.uploadCk,name='uploadCk'),
    url(r'^saveCk/',views.saveCk,name='saveCk'),
    url(r'^userdeleck/',views.userdeleck,name='userdeleck'),
    url(r'^userchangeck/',views.userchangeck,name='userchangeck'),
    url(r'^setuserchangeck/',views.setuserchangeck,name='setuserchangeck'),
    url(r'^changeuserck/',views.changeuserck,name='changeuserck'),
    url(r'^getchange/',views.getchange,name='getchange'),

    url(r'^uploadCheck/',views.uploadCheck,name='uploadCheck'),

    url(r'^getfoodByPhone/', views.getfoodByPhone, name='getfoodByPhone'),
    url(r'^getnotfoodByPhone/', views.getnotfoodByPhone, name='getnotfoodByPhone'),
    url(r'^getcbPagecount/', views.getcbPagecount, name='getcbPagecount'),
    url(r'^getnotcbPagecount/', views.getnotcbPagecount, name='getnotcbPagecount'),

    url(r'^showIndexPic/', views.showIndexPic, name='showIndexPic'),

    # bytjm
    url(r'^shicai/',views.shicai,name='shicai'),
    url(r'^getbooksbyname/',views.getbooksbyname,name='getbooksbyname'),
    url(r'^searchdevide/',views.searchdevide,name='searchdevide'),
    # url(r'^searchtiaojian/',views.searchtiaojian,name='searchtiaojian'),
    url(r'^gong/',views.gong,name='gong'),
    url(r'^diqu/',views.diqu,name='diqu'),
    url(r'^gettaste/',views.gettaste,name='gettaste'),
    url(r'^getallsearch/',views.getallsearch,name='getallsearch'),
    # url(r'^getallpages/',views.getallpages,name='getallpages'),

    url(r'^getkw/',views.getkw,name='getkw'),
    url(r'^getoshicai/',views.getoshicai,name='getoshicai'),
    url(r'^getshenhe/',views.getshenhe,name='getshenhe'),
    url(r'^getimgtoken/',views.getimgtoken,name='getimgtoken'),


]

from django.http import JsonResponse,HttpResponse
from dynamic.services.alldynamic import *
from dynamic.services.allcomment import *
from dynamic.services.userdynamic import *
from dynamic.services.publishdynamic import *
# Create your views here.

def dynamicindex(request):
    return HttpResponse('here is dynamicindex')

def getdynamic(request):
    '''获得所有用户动态基本标签 显示在全部动态页的'''
    condition=request.GET.get('condition')
    res=getalldynamic(condition)
    return HttpResponse(json.dumps(res))

def getdynamicall(request):
    '''根据id 查找全部动态信息'''
    id = request.GET.get('id')
    res = getflagbydyid(id)
    return HttpResponse(json.dumps(res))

#目前没有
def getdynamicCollection(request):
    '''得到动态的 被收藏丨'''
    pass

#目前没有
def getdynamicbeSee(request):
    '''动态被浏览数'''
    pass

#目前没有
def getdynamicbegood(request):
    '''动态被赞'''
    pass

#目前没有
def setdynagood(request):
    '''赞动态'''
    pass

def getdynam(request):
    '''获得动态标签'''
    id=request.GET.get('id')
    res=getflagbyid(id)
    return HttpResponse(json.dumps(res))

#目前没有
def setCollectting(request):
    '''根据动态id userPhone 收藏动态'''
    pass

def getUserDynamicper(request):
    '''用户userPhone 获得所有动态基本 显示简介等'''
    id = request.GET.get('id')
    res = getflagbyuserid(id)
    return HttpResponse(json.dumps(res))

def getDynamicomm(request):
    '''获得动态被评论 介绍'''
    id=request.GET.get('id')
    res=getcommentbydyid(id)
    return HttpResponse(json.dumps(res,ensure_ascii=False))
#------
def getUserDynamic(request):
    '''用户userPhone 获得所有动态基本 显示简介等'''
    userphone=request.GET.get('userphone')
    res=getuserdynamic(userphone)
    return HttpResponse(json.dumps(res,ensure_ascii=False))

#-------
def setDynamicCommyuan(request):
    '''动态id userPhone 评论动态'''
    comment=json.loads(request.body)
    pictures=comment["pictures"]
    del comment['pictures']
    res = setcommentyuan(comment,pictures)
    return HttpResponse(json.dumps(res))

#-------
def setDynamicComm(request):
    '''动态id userPhone 评论动态'''
    comment=json.loads(request.body)
    res = setcomment(comment)
    return HttpResponse(json.dumps(res))
#-------
def publishDynamic(request):
    '''发布动态'''
    dynamic=json.loads(request.body)
    res=pubDynamicbyphone(dynamic)
    return HttpResponse(json.dumps(res))

# *-********个人动态页面的删除及修改
#根据动态id删除个人动态
def delUserDynamic(request):

    dynamicid=request.GET.get('dynamicid')
    deluserdynamic(dynamicid)
    return JsonResponse({"code":"203"})

# 根据动态id获取信息
def getUserDynam(request):
    dynamicid = request.GET.get('dynamicid')
    af={
    }
    res=models.UserDynamic.objects.filter(id=dynamicid).values('title','content','picuture')
    for re in res:
        af["contents"]=re
    result=list(models.DynamicLabel.objects.filter(dynamicid=dynamicid).values('label','id'))
    af["labels"]=list(result)
    return HttpResponse(json.dumps(af,ensure_ascii=False))

# 根据动态id更新数据库
def updateUserDynamic(request):
    if request.method=='POST':
        res=json.loads(request.body)
        try:
            models.UserDynamic.objects.filter(id=res['id']).update(content=res['content'],title=res['title'])
            models.DynamicLabel.objects.filter(dynamicid=res['id']).delete()
            if res['label']:
                for rh in res['label']:
                    label = {
                        "dynamicid_id": res['id'],
                        "label": rh,
                    }
                    models.DynamicLabel.objects.create(**label)
        except Exception as ex:
            print(ex)
            return []
        return JsonResponse({'code':'800'})
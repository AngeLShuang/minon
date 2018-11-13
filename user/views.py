import uuid
from dynamic import models as mdls
from cookbook import models as modell
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from qiniu import Auth

from .services.userlogin import *
from .services.userbianji import *
from .services.personnal import *
from .utilss.make_token import *
from .services.usershenhe import *
import json


# Create your views here.

def userindex(request):
    return HttpResponse('here is index user')





def getimgtoken(request):
    try:
        # 需要填写你的 Access Key 和 Secret Key
        access_key = '6skhTPFKplO1oo5LVMColptorariUdibx4Q4v55_'
        secret_key = 'H5vntKEZIPi7ec1etlvvAnAhaxPiRk4-7GEnGSQl'
        userphone = request.GET.get('userphone')
        filename = 'minon.jpg'
        print(filename)
        # 构建鉴权对象
        q = Auth(access_key, secret_key)
        # 要上传的空间
        bucket_name = 'minon'
        key = str(uuid.uuid4()) + '.' + filename.split('.')[-1]
        # 生成上传 Token，可以指定过期时间等
        token = q.upload_token(bucket_name, key, 3600)
        print(userphone)
        uu = list(models.UserInform.objects.filter(userphone=userphone).values('headportraitid'))[0]
        print(uu)
        save = models.UserHeadportrait.objects.filter(id=uu['headportraitid']).update(
            picture='http://pgsnqecfs.bkt.clouddn.com/' + key)
        print(2222, save)
        domain = 'http://pgsnqecfs.bkt.clouddn.com/'
        return JsonResponse({"uptoken": token, "domain": domain, "key": key})
    except Exception as ex:
        print('error-------------------------')
        print(ex)
        return JsonResponse({"code": "408"})

def getimgtokens(request):
    try:
        # 需要填写你的 Access Key 和 Secret Key
        access_key = '6skhTPFKplO1oo5LVMColptorariUdibx4Q4v55_'
        secret_key = 'H5vntKEZIPi7ec1etlvvAnAhaxPiRk4-7GEnGSQl'
        dyid = request.GET.get('dyid')
        lens = request.GET.get('lens')
        shuju=[]
        filename = 'minon.jpg'
        print(lens)
        for i in range(0,int(lens)):
            # 构建鉴权对象
            q = Auth(access_key, secret_key)
            # 要上传的空间
            bucket_name = 'minon'
            key = str(uuid.uuid4()) + '.' + filename.split('.')[-1]
            # 生成上传 Token，可以指定过期时间等
            token = q.upload_token(bucket_name, key, 3600)
            uu = mdls.DynamiccommentPicuture.objects.create(dynamiccomid_id=dyid,
                                                            picturesrc='http://pgsnqecfs.bkt.clouddn.com/' + key)
            print(uu)
            # save = model.UserHeadportrait.objects.filter(id=uu['headportraitid']).update(
            #     picture='http://pgsnqecfs.bkt.clouddn.com/' + key)
            domain = 'http://pgsnqecfs.bkt.clouddn.com/'
            shuju.append({"uptoken": token, "domain": domain, "key": key})
        return HttpResponse(json.dumps(shuju))
    except Exception as ex:
        print('error-------------------------')
        print(ex)
        return JsonResponse({"code": "408"})

def login(request):
    if request.method == 'GET':
        result = getyzm()
        return HttpResponse(json.dumps(result))
    elif request.method == 'POST':
        # print(request)
        user = json.loads(request.body)
        # print(user)
        res = login_ser(user)
        # print(res)
        resp = JsonResponse(res)
        # print('resp',resp)
        if res['code'] == '201':
            token = makeToken(res['id'])
            resp['token'] = token
            resp["Access-Control-Expose-Headers"] = "token"
        return resp


def chklogin(request):
    try:
        send = json.loads(request.body)
        # print(openToken(send['token']))
        if send['id'] == openToken(send['token'])['message']:
            # and openToken(send['token'])['exp'] > time.time()
            return JsonResponse({'code': '222'})
        else:
            return JsonResponse({'code': '422'})
    except Exception as ex:
        print(ex)


def getduanxinyz(request):
    yanzheng = request.GET.get('tel')
    # print(yanzheng)
    res = getduanxin(yanzheng)
    if str(res['code']) == '00000':
        return JsonResponse({'code': '209'})
    else:
        return JsonResponse({'code': '409'})


def regist(request):
    if request.method == 'GET':
        return JsonResponse({'code': '403'})
    else:
        user = json.loads(request.body)
        # print(user)
        res = regist_ser(user)
        if res and res['code'] == '203':
            resp = JsonResponse(res)
            token = makeToken(res['id'])
            resp['token'] = token
            resp["Access-Control-Expose-Headers"] = "token"
            # print(resp['token'])
            return resp
        else:
            return JsonResponse(res)


def getuser(request):
    res = checkuser(request.GET.get('tel'))
    return JsonResponse(res)


def Forgit(request):
    uu = json.loads(request.body)
    res = forgit(uu)
    return JsonResponse(res)


def checkYzm(request):
    yz = json.loads(request.body)
    res = checkyzm(yz)
    return HttpResponse(json.dumps(res))

def getCookBookUser(request):
    nowfood=request.GET.get('nowfood')
    res=getcookbookuser(nowfood)
    return HttpResponse(json.dumps(res))

def getUserByuserPhone(request):
    '''用户部分信息'''
    userphone = request.GET.get('id')
    res = getusermessage(userphone)
    return JsonResponse(res)


def getUserAllMessageByuserPhone(request):
    '''用户全部信息'''
    myid = request.GET.get('myid')
    res = getallmessage(myid)
    return HttpResponse(json.dumps(res))


def setUserMessageByuserPhone(request):
    try:
        user = json.loads(request.body)
    except:
        user = {}
    res = changemessage(user)
    if res:
        return HttpResponse(json.dumps({'code': '201'}))
    else:
        return HttpResponse(json.dumps({'code': '401'}))


def changeUserNickname(request):
    try:
        user = json.loads(request.body)
    except Exception as ex:
        print(ex)
        user = {}
    res = changeusernickname(user)
    # res=''
    if res:
        return HttpResponse(json.dumps({'code': '201'}))
    else:
        return HttpResponse(json.dumps({'code': '401'}))


def changeUserPassword(request):
    try:
        user = json.loads(request.body)
        # print('1111',user)
        res = changeuserpwd(user)
        print(res)
        return HttpResponse(json.dumps(res))
    except Exception as ex:
        print(ex)
        return HttpResponse(json.dumps({'code': '403'}))


def changeUserTelephone(request):
    try:
        uu = json.loads(request.body)
        res = changeusertelephone(uu)
        return HttpResponse(json.dumps(res))
    except Exception as ex:
        print(ex)
        return HttpResponse(json.dumps({'code': '403'}))


def getUserCookbook(request):
    userphone = request.GET.get('userphone')
    print(userphone)
    res = getusercookbook(userphone)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


def getUserFans(request):
    '''关注粉丝'''
    userphone = request.GET.get('userphone')
    myphone = request.GET.get('myphone')
    res = getuserfans(userphone, myphone)
    return HttpResponse(json.dumps(res))


def getFans(request):
    '''关注粉丝'''
    userphone = request.GET.get('userphone')
    myphone = request.GET.get('myphone')
    res = getfans(userphone, myphone)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


def getUserCollection(request):
    '''收藏的菜谱'''
    pass


def userSignin(request):
    '''签到'''
    pass


def guanzhuUser(request):
    phone = request.GET.get('phone')
    beattephone = request.GET.get('beattephone')
    res = guanzhuuser(phone, beattephone)
    # print(res)
    return HttpResponse(json.dumps(res))
    pass


def reguanzhuUser(request):
    phone = request.GET.get('phone')
    beattephone = request.GET.get('beattephone')
    res = reguanzhuuser(phone, beattephone)
    # print(res)
    return HttpResponse(json.dumps(res))


#获取我已经审核过的

#     1:审核通过
#     2:未审核
#     0:审核未通过

def getYiShenheOther(request):
    userid = json.loads(request.body)
    res = getYiShenhe(userid)
    return HttpResponse(json.dumps(res,ensure_ascii=False))

#通过用户id和菜谱id查找详细审核信息
def getdetailedche(request):
    shen=json.loads(request.body)
    res=getdetailedChecked(shen)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


#获取还未审核的
def getWeiShenheOther(request):
    userid = json.loads(request.body)
    res = getWeiShenhe(userid)
    return HttpResponse(json.dumps(res, ensure_ascii=False))

#同意修改步骤
def agreeUpdateStep(request):
    content=request.GET.get("content")
    pic=request.GET.get("pic")
    stepid=request.GET.get("stepid")
    checkid=request.GET.get('checkid')
    res = agreeUpdate(stepid,checkid,content,pic)
    return HttpResponse(json.dumps(res, ensure_ascii=False))

def notagreeUpdateStep(request):
    checkid = request.GET.get('checkid')
    res = notagreeUpdate(checkid)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


'''删除菜谱'''
def delCaipu(request):
    try:
        id=request.GET.get('getid')
        res=modell.CookbookIntroduce.objects.get(baseid_id=id).delete()
        res=modell.CookbookBasic.objects.get(id=id).delete()
        return HttpResponse(json.dumps({'code':200}))
    except Exception as ex:
        print(ex)
        return HttpResponse(json.dumps({'code': 400}))


'''编辑菜谱'''
def compileCaipu(request):
        print(request)
        id=request.GET.get('getid')
        print(id)
        res=bianji(id)
        print(res)
        return HttpResponse(json.dumps(res,ensure_ascii=False))
        # res = modell.CookbookIntroduce.objects.get(baseid_id=id)
        #         # data = res.__dict__
        #         # print(data)
        #         # # for i in data.values():
        #         # #     # print(i)
        #         # #     allshuju.append(i)
        #         # # print(allshuju)
        #         # return HttpResponse(json.dumps(data,ensure_ascii=False))
        #         # # return JsonResponse({"code":"200"})

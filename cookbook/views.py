import random
from qiniu import Auth
import uuid
from .services.allrecipes import *
from .services.foodxiangqing import *
from .services.indexshow import showindex
from .services.publishcookbook import *
from .services.foodcheck import *
from .services.shicainew import *
from .services.allcookbooks import *
from django.http import HttpResponse,JsonResponse

def cookbookindex(request):
    return HttpResponse('here is cookbook index')

def cookbookbrowl(request):
    uu=request.GET.get('id')
    ck=request.GET.get('nowfood')
    res=addbrowl(uu,ck)
    return HttpResponse(json.dumps(res))

def getckBaseMessage(request):
    '''取食谱基本信息'''
    jishu=request.GET.get('jishu')
    try:
        jishu=int(jishu)
    except Exception as ex:
        jishu=1
    res=getallcookbook(jishu)
    return HttpResponse(json.dumps(res,ensure_ascii=False))

def getckAllMessage(request):
    try:
        jishu=request.GET.get('jishu')
        kouwei=request.GET.get('kw')
        res=getallrec(jishu,str(kouwei).strip())
        return HttpResponse(json.dumps(res,ensure_ascii=False))
    except Exception as ex:
        print(ex)

def getindex(request):
    cookbook=[]
    cookbooks=showindex()
    for i in range(5):
        cookbook.append(random.choice(cookbooks))
    return HttpResponse(json.dumps(cookbook))

def getfoodMessage(request):
    food=request.GET.get('nowfood')
    res=getxiangqing(food)
    return JsonResponse(res)

def getsgicaibuzou(request):
    res=getshicai(request.GET.get('nowfood'))
    return JsonResponse(res)

def gettaste(request):
    '''获取口味'''
    res=getalltaste()
    return HttpResponse(json.dumps(res,ensure_ascii=False))

def getallsearch(request):
    try:
        message=json.loads(request.body)
        res=getallsea(message)
    except Exception as ex:
        print(ex)
        res=[]
    return  HttpResponse(json.dumps(res,ensure_ascii=False))

def getallpages(request):
    try:
        message=json.loads(request.body)
        res=getallpage(message)
    except Exception as ex:
        print(ex)
        res=[]
    return  HttpResponse(json.dumps(res,ensure_ascii=False))

def getoshicai(request):
    '''在小吃大全页获取食材'''
    count=request.GET.get('count')
    try:
        count=int(count)
    except Exception as ex:
        count=1
    res=getallshicai(count)
    return HttpResponse(json.dumps(res,ensure_ascii=False))

def getkw(request):
    '''请求的满足的口味食谱信息'''
    if request.method=='GET':
        con=request.GET.get('con')
        res=getbfkw(con)
    return HttpResponse(json.dumps(res,ensure_ascii=False))

def getfooduser(request):
    '''当前菜谱人信息'''
    pass

def collectCk(request):
    ck=request.GET.get('nowfood')
    id=request.GET.get('id')
    want=request.GET.get('coll_not')
    res=collectck(ck,id,want)
    return HttpResponse(json.dumps(res))

def uploadCk(request):
    '''上传菜谱'''
    cookbook = json.loads(request.body)
    res = publishcookbook(cookbook)
    return HttpResponse(json.dumps(res))

def saveCk(request):
    '''修改菜谱'''
    cookbook = json.loads(request.body)
    res = savecookbook(cookbook)
    return HttpResponse(json.dumps(res))

def userdeleck(request):
    '''用户删除自己食谱'''
    pass

def setuserchangeck(request):
    try:
        mess=json.loads(request.body)
        res=setuserchange(mess)
        return HttpResponse(json.dumps(res,ensure_ascii=False))
    except Exception as ex:
        print(ex)

def changeuserck(request):
    try:
        mess=json.loads(request.body)
        res=changeupdata(mess)
        return HttpResponse(json.dumps(res,ensure_ascii=False))
    except Exception as ex:
        print(ex)

def getchange(request):
    try:
        mes=request.GET.get('myid')
        res=getchangeshuju(mes)
        return HttpResponse(json.dumps(res))
    except Exception as ex:
        print(ex)
        return HttpResponse(json.dumps({'code':400}))


def userchangeck(request):
    '''用户修改自己食谱让用户修改
        用上传ck界面  取出放入页面
    '''
    pass

def changeBuzou(request):
    '''根据传来的步骤信息 给上传者审核是否修改'''
    mes=json.loads(request.body)
    res=changebz(mes)
    #210
    return JsonResponse(res)

def uploadCheck(request):
    '''用户审核 修改步骤'''
    pass

def getfoodByPhone(request):
    '''查找用户已经被审核过的菜谱,暂时只取前30条'''

    mes = json.loads(request.body)
    res = getfoodByPhonecheck(mes)
    return HttpResponse(json.dumps(res, ensure_ascii=False))

def getnotfoodByPhone(request):
    '''查找用户未审核或审核没通过的菜谱,暂时只取前30条'''
    mes = json.loads(request.body)
    res = getnotfoodByPhonecheck(mes)
    return HttpResponse(json.dumps(res, ensure_ascii=False))

def getcbPagecount(request):
    '''查找该用户已通过审核菜谱的总数'''
    mes = json.loads(request.body)
    res = getPagecount(mes)
    return HttpResponse(json.dumps(res))

def getnotcbPagecount(request):
    '''查找该用户未审核或审核没通过的菜谱的总数'''
    mes = json.loads(request.body)
    res = getnotPagecount(mes)
    return HttpResponse(json.dumps(res))

def showIndexPic(request):
    re=list(models.CookbookIndex.objects.all().values('id','src','title'))
    a=[]
    for r in re:
        a.append(r)
    dd=random.sample(a,2)
    return HttpResponse(json.dumps(dd,ensure_ascii=False))

#----------------------bytjm
# 所有食材详情
def shicai(request):
    name = request.GET.get('food_name')
    result = shicaiName(name)
    return HttpResponse(json.dumps(result, ensure_ascii=False))

# 大块获取所有数据
def getbooksbyname(request):
    shicainame = request.GET.get('food_name')
    page = request.GET.get('jishu')
    try:
        jishu = int(page)
    except Exception as ex:
        jishu = 1
    res = getallcookbooks(shicainame, jishu)
    return HttpResponse(json.dumps(res, ensure_ascii=False))

# 多条件查询
def searchdevide(request):
    if request.method == 'POST':
        tem = request.body
        mn_search = json.loads(tem)['search']
        mn_belong = json.loads(tem)['belongto']
        mn_tasteLabel = json.loads(tem)['tasteLabel']
        mn_styleName = json.loads(tem)['styleName']
        mn_time = json.loads(tem)['time']
        mn_liulan = json.loads(tem)['liulan']
        all = list(models.CookbookBasic.objects.filter(cookbookname__icontains=mn_search,
                                                       belongto__icontains=mn_belong).values('id'))
        aa = []
        for i in all:
            shuju = list(
                models.CookbookIntroduce.objects.filter(baseid=i['id'], tasteid__tastelabel__icontains=mn_tasteLabel,
                                                        styleid__stylename__icontains=mn_styleName).values(
                    "baseid__cookbookname", "baseid__cookbookpictures", "userphone__userinform__usernickname",
                    'baseid__belongto', 'tasteid__tastelabel', 'styleid__stylename', 'efficacy', 'uploadtime'))
            # 浏览
            see = models.CookbookBrowse.objects.filter(cookbookid=i['id']).count()
            # 评论
            comment = models.CookbookComment.objects.filter(cookbookid=i['id']).count()

            #     遍历获取的数据
            for l in shuju:
                l['uploadtime'] = str(l['uploadtime']).split(' ')[0]
                l['see'] = see
                l['comment'] = comment
                aa.append(l)
            if mn_time == 'yes':
                aa = sorted(aa, key=lambda a: a['uploadtime'], reverse=True)

            elif mn_liulan == '按热度':
                aa = sorted(aa, key=lambda a: a['see'], reverse=False)
            else:
                aa = aa
        return HttpResponse(json.dumps(aa, ensure_ascii=False))

# 搜索里面的条件
def searchtiaojian(request):
    res = list(models.CookbookTaste.objects.all().values('tastelabel'))
    all = []
    for r in res:
        if r not in all and r['tastelabel'] != ' ':
            all.append(r)

    return HttpResponse(json.dumps(all, ensure_ascii=False))

def diqu(request):
    dq = list(models.CookbookStyle.objects.all().values('stylename'))
    all = []

    for d in dq:
        all.append(d['stylename'])
    return HttpResponse(json.dumps(all, ensure_ascii=False))

def gong(request):
    gong = (list(models.CookbookBasic.objects.all().values('belongto')))
    all = []
    for g in gong:
        if g['belongto'] not in all:
            all.append(g['belongto'])
    return HttpResponse(json.dumps(all, ensure_ascii=False))

def morenye(request):
    allresult=list(models.CookbookIntroduce.objects.all().values('baseid',
                    "baseid__cookbookname", "baseid__cookbookpictures", "userphone__userinform__usernickname",
                    'baseid__belongto', 'tasteid__tastelabel', 'styleid__stylename', 'efficacy','baseid__cookbookcomment','baseid__cookbookbrowse'))[0:10]
    aa=[]


    for l in allresult:
        id=l['baseid']
        # 浏览
        see = models.CookbookBrowse.objects.filter(cookbookid=id)[0:10].count()
        # 评论
        comment = models.CookbookComment.objects.filter(cookbookid=id)[0:10].count()
        l['see'] = see
        l['comment'] = comment
        aa.append(l)

    return HttpResponse(json.dumps(aa, ensure_ascii=False))

def getimgtoken(request):
    try:
        access_key = '6skhTPFKplO1oo5LVMColptorariUdibx4Q4v55_'
        secret_key = 'H5vntKEZIPi7ec1etlvvAnAhaxPiRk4-7GEnGSQl'
        # buzouid = request.GET.get('buzouid')
        filename = 'minon.jpg'
        # 构建鉴权对象
        q = Auth(access_key, secret_key)
        # 要上传的空间
        bucket_name = 'minon'
        key = str(uuid.uuid4()) + '.' + filename.split('.')[-1]
        # 生成上传 Token，可以指定过期时间等
        token = q.upload_token(bucket_name, key, 3600)
        domain = 'http://pgsnqecfs.bkt.clouddn.com/'
        return JsonResponse({"uptoken": token, "domain": domain, "key": key})
    except Exception as ex:
        print('error-------------------------')
        print(ex)
        return JsonResponse({"code": "408"})

def getshenhe(request):
    try:
        userphone=request.GET.get('userphone')
        res=models.CookbookStepupdate.objects.filter(phone=userphone,isallow=2).count()
        return HttpResponse(json.dumps({'count':res}))
    except Exception as ex:
        print(ex)
    return HttpResponse(json.dumps({'count': 0}))
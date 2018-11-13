from .. import models
from user.models import UserLogin

def getxiangqing(foodid):
    try:
        food=models.CookbookIntroduce.objects.filter(baseid=foodid)[:1].values('userphone_id','baseid__cookbookname','styleid__stylename','tasteid__tastelabel','baseid__belongto','totalpictures','detailintroduce','efficacy','cookbookgoodnum','cookbookbadnum')[0]
        collected=list(models.CookbookCollection.objects.filter(cookbookid=foodid).values('userphone'))

        food['collected']=collected
    except Exception as ex:
        print(ex)
        food=[]
    return food

def getshicai(foodid):
    food = {}
    try:
        f=list(models.CookbookCbfood.objects.filter(cookbookid=foodid).values('foodzhu','foodfu'))[0]
        food['zhu']=f['foodzhu'].split(',')
        food['fu']=f['foodfu'].split(',')
    except Exception as ex:
        print(ex)
    try:
        buzou = list(models.CookbookMarche.objects.filter(cookbookid=foodid).values('id','stepcontent', 'picturesrc'))
        for i in range(len(buzou)):
            rr=list(models.CookbookStepupdate.objects.filter(stepid=buzou[i]['id']).values('content','pic','isallow'))
            for r in rr:
                if r['isallow'] and str(r['isallow'])=='1':
                    buzou[i]['stepcontent']=r['content']
                    buzou[i]['picturesrc']=r['pic']
    except Exception as ex:
        buzou=[]
    food['buzou'] = buzou

    return food

def addbrowl(uu,ck):
    try:
        res=models.CookbookBrowse.objects.create(cookbookid_id=ck,userphone_id=uu)
        if res:
            return {'code':'203'}
    except Exception as ex:
        print(ex)
    return {'code':'403'}


def changebz(mes):
    try:
        mes['isallow']=2
        res=models.CookbookStepupdate.objects.create(**mes)

    except Exception as ex:
        print(ex)
        res=0
    if res:
        return {'code':'210'}
    else:
        return {'code':'410'}


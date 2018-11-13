from cookbook import models

#添加食谱基本表
def addcookbookbassic(cookbook):
    cb = {
        "cookbookpictures": cookbook["cookbookpictures"],
        "cookbookname": cookbook["cookbookname"],
        "belongto": cookbook["belongto"],
    }
    res = models.CookbookBasic.objects.create(**cb)
    return res

#添加食谱食材表
def addcookbookcbfood(cookbook,res):
    cbfood = {
        "cookbookid_id": res.id,
        "foodzhu": ','.join(cookbook["foodzhu"]),
        "foodfu": '.'.join(cookbook["foodfu"]),
    }
    res2 = models.CookbookCbfood.objects.create(**cbfood)
    return res2

#添加食谱详情表
def addIntroduce(cookbook,res):
    introduce = {
        "userphone_id": cookbook["userphone"],
        "styleid_id": list(models.CookbookStyle.objects.filter(stylename=cookbook["style"]).values('id')[:1])[0]["id"],
        "tasteid_id":list(models.CookbookTaste.objects.filter(tastelabel=cookbook["taste"]).values('id')[:1])[0]["id"],
        "baseid_id":res.id,
        "totalpictures":cookbook["totalpictures"],
        "detailintroduce":cookbook["detailintroduce"],
        "efficacy":cookbook["efficacy"],
        "cookbookgoodnum":'0',
        "cookbookbadnum":'0',
    }
    res4 = models.CookbookIntroduce.objects.create(**introduce)
    return res4

def addLabel(labelall,res):
    if len(labelall)>0:
        try:
            for l in labelall:
                label = {
                    "cookbookid_id": res.id,
                    "label": l,
                }
                res5= models.CookbookLabel.objects.create(**label)
        except Exception as ex:
            res5 = 0
    else:
        res5=0
    return res5

def addMarche(marcheall,res):
    if len(marcheall)>0:
        try:
            for m in marcheall:
                marche = {
                    "cookbookid_id": res.id,
                    "stepnumber": m["stepnumber"],
                    "picturesrc":m["picturesrc"],
                    "stepcontent":m["stepcontent"]
                }
                res6 = models.CookbookMarche.objects.create(**marche)
        except Exception as ex:
            res6=0
    else:
        res6=0
    return res6

def publishcookbook(cookbook):
    try:
        res=addcookbookbassic(cookbook)
        res2=addcookbookcbfood(cookbook,res)
        res4=addIntroduce(cookbook,res)
        res5=addLabel(cookbook['label'],res)
        res6=addMarche(cookbook['marche'],res)
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}  # 已存在
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误

def savecookbook(cookbook):
    try:
        res=models.CookbookIntroduce.objects.filter(baseid_id=cookbook['ckid']).update(totalpictures=cookbook['cookbookpictures'],efficacy=cookbook['efficacy'],detailintroduce=cookbook['detailintroduce'])
        mes = list(models.CookbookIntroduce.objects.filter(baseid_id=cookbook['ckid']).values('styleid','tasteid','baseid'))[0]
        res=models.CookbookBasic.objects.filter(id=cookbook['ckid']).update(cookbookpictures=cookbook['cookbookpictures'],cookbookname=cookbook['cookbookname'],belongto=cookbook['belongto'])
        models.CookbookCbfood.objects.filter(cookbookid=cookbook['ckid']).update(foodzhu=','.join(cookbook['foodzhu']),foodfu=','.join(cookbook['foodfu']))
        models.CookbookTaste.objects.filter(id=mes['tasteid']).update(tastelabel=cookbook['taste'])
        models.CookbookStyle.objects.filter(id=mes['styleid']).update(stylename=cookbook['style'])
        return {'code':'205'}
    except Exception as ex:
        print(ex)
        return {'code':'401'}

def collectck(ck,id,want):
    try:
        if want=='收藏':
            res=models.CookbookCollection.objects.create(userphone_id=id,cookbookid_id=ck)
            if res:
                return {'code': '230'}
        else:
            res = models.CookbookCollection.objects.get(userphone_id=id, cookbookid_id=ck).delete()
            if res:
                return {'code': '231'}
    except Exception as ex:
        print(ex)
    return {'code':'430'}

def setuserchange(mess):
    try:
        models.CookbookChange.objects.create(stepid_id=mess['stepid_id'],content=mess['content'],userphone_id=mess['yours'],pic=mess['pic'],isread=0,phone_id=mess['uu'])
        return {'code':'210'}
    except Exception as ex:
        print(ex)
        return 0

def changeupdata(mess):
    try:
        models.CookbookChange.objects.filter(stepid_id=mess['stepid_id'],phone_id=mess['uu']).update(isread=1)
        return 1
    except Exception as ex:
        print(ex)
        return 0

def getchangeshuju(mess):
    try:
        res=list(models.CookbookChange.objects.filter(userphone_id=mess,isread=0).values())
        for i in range(len(res)):
            res[i]['updatetime']=str(res[i]['updatetime']).split(' ')[0]
        return res
    except Exception as ex:
        print(ex)
        return []
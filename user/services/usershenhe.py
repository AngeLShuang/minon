from user import models
from cookbook import models as model


# 获取所有已审核的步骤修改
def getYiShenhe(shenhe):
    try:
        list1 = list(model.CookbookStepupdate.objects.filter(stepid__cookbookid__cookbookintroduce__userphone=shenhe["userid"],isallow__lt=2).values('userphone','stepid__cookbookid__cookbookname','stepid__cookbookid__cookbookpictures','stepid__cookbookid'))
        shenhe1=[]
        for i in list1:
            shenqing = {
                "shenqingrenId":i["userphone"],
                "cookbookName":i["stepid__cookbookid__cookbookname"],
                "cookbookPictures":i["stepid__cookbookid__cookbookpictures"],
                "cookbookId":i["stepid__cookbookid"]
            }
            shenhe1.append(shenqing)
        test = []
        for l in shenhe1:
            if l not in test:
                test.append(l)
        return test
    except Exception as ex:
        print(ex)
        return []

# 获取所有未审核的步骤修改
def getWeiShenhe(shenhe):
    try:
        list1 = list(model.CookbookStepupdate.objects.filter(stepid__cookbookid__cookbookintroduce__userphone=shenhe["userid"],isallow=2).values('userphone','stepid__cookbookid__cookbookname','stepid__cookbookid__cookbookpictures','stepid__cookbookid'))
        shenhe2=[]
        for i in list1:
            shenqing = {
                "shenqingrenId":i["userphone"],
                "cookbookName":i["stepid__cookbookid__cookbookname"],
                "cookbookPictures":i["stepid__cookbookid__cookbookpictures"],
                "cookbookId":i["stepid__cookbookid"]
            }
            shenhe2.append(shenqing)
        test = []
        for l in shenhe2:
            if l not in test:
                test.append(l)
        return test
    except Exception as ex:
        print(ex)
        return []

#获取详细修改信息
def getdetailedChecked(shenhe):
    try:
        info = list(model.CookbookStepupdate.objects.filter(userphone=shenhe["userid"],stepid__cookbookid=shenhe["cookbookid"]).values('stepid','id','userphone__userinform__usernickname','userphone__userinform__headportraitid__picture','stepid__stepcontent','content','pic','updatetime','isallow'))
        for i in range(len(info)):
            info[i]['updatetime']=str(info[i]['updatetime']).split(' ')[0]
        shenhe1 = []
        for i in info:
            shenqing1 = {
                "shenqingcontent": i["content"],
                "isallow":i["isallow"],
                "picture":i["pic"],
                "yuancontent":i["stepid__stepcontent"],
                "updatetime":i["updatetime"],
                "userheadpic":i["userphone__userinform__headportraitid__picture"],
                "usernickname":i["userphone__userinform__usernickname"],
                "stepid":i["stepid"],
                "checkid":i["id"]
            }
            shenhe1.append(shenqing1)
        return shenhe1
    except Exception as ex:
        print(ex)
        return []


def agreeUpdate(stepid,checkid,content,pic):
    try:
        res=model.CookbookStepupdate.objects.filter(id=checkid).update(isallow='1')
        res1=model.CookbookMarche.objects.filter(id=stepid).update(picturesrc=pic,stepcontent=content)
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误

def notagreeUpdate(checkid):
    try:
        res = model.CookbookStepupdate.objects.filter(id=checkid).update(isallow='0')
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}  # 已存在
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误



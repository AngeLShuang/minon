from cookbook import models
from user import models as model
import json,time
from user.utilss.jiajiemi import jiemi, jiami


def getusercookbook(userphone):
    try:
        cookbooks=list(models.CookbookIntroduce.objects.filter(userphone=userphone).values('uploadtime','baseid','baseid__cookbookname','baseid__belongto','baseid__cookbookpictures','efficacy','userphone__userinform__usernickname','tasteid__tastelabel','styleid__stylename'))

        for i in range(len(cookbooks)):
            cookbooks[i]['efficacyone'] = str(cookbooks[i]['efficacy']).split(',')[0]
            cookbooks[i]['uploadtime'] = str(cookbooks[i]['uploadtime']).split(' ')[0]
        # print(len(cookbooks))
        cookbooks = sorted(cookbooks, key=lambda t: t['uploadtime'],reverse = True)
        return cookbooks[:30]
    except Exception as ex:
        print(ex)
        return []


def getuserfans(userphone,myphone):
    try:
        guanzhu=list(model.UserFans.objects.filter(phone=userphone).values('beattephone','beattephone__userinform__usernickname','beattephone__userinform__headportraitid_id__picture','beattephone__userinform__usersign'))
        for i in range(len(guanzhu)):
            countguanzhu=model.UserFans.objects.filter(phone=guanzhu[i]['beattephone']).count()
            countfans=list(model.UserFans.objects.filter(beattephone=guanzhu[i]['beattephone']).values('phone'))
            if not len(countfans):
                guanzhu[i]['guanzhutf'] = '关注'
            for jj in countfans:
                if myphone == jj['phone']:
                    guanzhu[i]['guanzhutf'] = '取消关注'
                else:
                    guanzhu[i]['guanzhutf'] = '关注'
            guanzhu[i]['countguanzhu']=countguanzhu
            guanzhu[i]['countfans']=len(countfans)
            print(guanzhu)
    except Exception as ex:
        print(ex)
        guanzhu=[]
    return guanzhu

def getfans(userphone,myphone):
    try:
        fans=list(model.UserFans.objects.filter(beattephone=userphone).values('phone','phone__userinform__usernickname','phone__userinform__headportraitid_id__picture','phone__userinform__usersign'))
        print(fans)
        for i in range(len(fans)):
            countguanzhu=model.UserFans.objects.filter(phone=fans[i]['phone']).count()
            countfans=list(model.UserFans.objects.filter(beattephone=fans[i]['phone']).values('phone'))
            # print(countfans)
            if not len(countfans):
                fans[i]['guanzhutf'] = '关注'
            for jj in countfans:
                if myphone == jj['phone']:
                    fans[i]['guanzhutf'] = '取消关注'
                else:
                    fans[i]['guanzhutf'] = '关注'
            fans[i]['countguanzhu'] = countguanzhu
            fans[i]['countfans'] = len(countfans)
            print(fans)
        return fans
    except Exception as ex:
        print(ex)
        return []

def guanzhuuser(phone,beattephone):
    try:
        res=model.UserFans.objects.create(phone_id=phone,beattephone_id=beattephone)

        if res and res.id:
            return {'code':'206'}
        return {'cdoe':'407'}
    except Exception as ex:
        print(ex)
        return {'cdoe':'406'}

def reguanzhuuser(phone,beattephone):
    try:
        r=model.UserFans.objects.get(phone_id=phone,beattephone_id=beattephone)
        res=r.delete()
        if res:
            return {'code':'206'}
        return {'cdoe':'407'}
    except Exception as ex:
        print(ex)
        return {'cdoe':'406'}


def changemessage(user):
    try:
        userphone=list(model.UserLogin.objects.filter(telephone=user['te']))[0]
        occupi=list(model.UserOccupation.objects.filter(occupation=user['prefess']))
        if not occupi:
            oo = 7
        else:
            oo = occupi[0]
        if not user['input_sm']:
            briday='2018-11-1'
        else:
            briday=user['input_sm']
        r=model.UserHeadportrait.objects.create(picture=user['headpic'])
        print(occupi)
        res=model.UserInform.objects.filter(userphone=userphone.userphone).update(headportraitid=r.id,userbriday=briday,userprovince=user['home_province'],usercity=user['home_city'],usersign=user['sign'],professionid=oo)
        # r=model.UserOccupation.objects.filter(id=userphone)
        print(res)
    except Exception as ex:
        print(ex)
        res=0
    return res

def changeusernickname(user):
    try:
        print(user)
        res=model.UserInform.objects.filter(userphone=user['userphone']).update(usernickname=user['nickname'])
        return res
    except Exception as ex:
        print(ex)
        return None

def changeuserpwd(user):
    try:
        yzm=model.UserYzm.objects.filter(telephone=user['telephone']).first()
        if yzm.dx==user['duanxin'] and float(yzm.dxtime)+300>time.time():
            print(user)
            if user["newpwd"] == user["newpwd2"]:
                # print('mimayizhi')
                # print(model.UserLogin)
                userp = model.UserLogin.objects.filter(telephone=user['telephone']).first()
                # print(userp)
                if userp.userphone:
                    usern = model.UserLogin.objects.filter(userphone=userp.userphone).first()
                    if jiemi(user['pwd'],usern.userpassword):
                        # print('xiugaichengg')
                        affect_rows=models.UserLogin.objects.filter(userphone=userp.userphone).update(userpassword=jiami(user["newpwd"]))
                        if affect_rows:
                            return {'code':'206'}
                        else:
                            return {'code':'404'}
                    else:
                        return {'code': '406'}
            else:
                return {'code':'406'}   #两次密码不一致
        else:
            return {'code':'405'}           #验证码不正确 或已过期
    except Exception as ex:
        print(ex)
        return None

def forgit(user):
    try:
        res=model.UserLogin.objects.filter(telephone=user['tel']).update(userpassword=jiami(user['pwd']))
        print(res)
        if res:
            return {'code':'210'}
    except Exception as ex:
        print(ex)
    return {'code':'410'}

def changeusertelephone(uu):
    try:
        dx=model.UserYzm.objects.get(telephone=uu['newtelephone'])
        # print(dx.dxtime+300>time.time())
        if dx.dx==uu['newyzm'] and float(dx.dxtime)+300000>time.time():
            res=model.UserLogin.objects.filter(telephone=uu['telephone']).update(telephone=uu['newtelephone'])
            if res:
                return {'code': '220'}
            else:
                return {'code': '420'}
        else:
            return {'code':'421'}

    except Exception as ex:
        print(ex)
        return {'code':'420'}


def checkyzm(user):
    try:
        res=model.UserYzm.objects.filter(dx=user['dx'],telephone=user['tel'])
        if res:
            return {'code':'208'}
    except Exception as ex:
        print(ex)
    return {'code':'408'}
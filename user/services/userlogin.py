from ..utilss.yanzhengma import setyzm
from ..utilss.duanxin import *
from user import models
from datetime import datetime
from ..utilss.jiajiemi import *
from cookbook import models as model

def getyzm():
    data,img=setyzm()
    pic={
        'yzm':''.join(data),
        'src':img
    }
    return pic

def getduanxin(tel):
    try:
        global duanxinm
        setphone(tel)
        duanxinm = rund()
        print(duanxinm)
        print(str(duanxinm['code'])=='00000')
        try:
            if str(duanxinm['code'])=='00000':
                dxm={
                    'telephone':tel,
                    'dx':duanxinm['dx'],
                    'dxtime':duanxinm['time']
                }
                print(dxm)
                models.UserYzm(**dxm).save()
        except Exception as ex:
            print(ex)
        # print(duanxinm)
        return duanxinm
    except Exception as ex:
        print(ex)

def login_ser(user):
    try:
        usermes= list(models.UserLogin.objects.filter(telephone=user['telephone']).values())#取到字典列表
        # print('11111111',usermes)
        userall= list(models.UserInform.objects.filter(userphone=usermes[0]['userphone']).values('usernickname','useremail','userbriday','userprovince','usercity','usersex','headportraitid__picture','professionid__occupation'))#取到字典列表
        # print('22222222',userall)
        if usermes==[]:
            return {
                'code':'405'            #没有该用户
            }
        elif jiemi(user['password'],usermes[0]['userpassword']):
            result={
                'code':'201',
                'id':usermes[0]['userphone'],
                'user':userall,
            }
            # print(result)
        else:
            result={'code':'402'}           #密码错误

    except Exception as ex:
        # print(ex)
        result={
            'code':'500'
        }
    return result

def regist_ser(mes):
    try:
        telephone=mes['telephone']
        pwd=mes['password']
        dxyzm=mes['dxyzm']
        try:
            # print('kais')
            duanxinm=list(models.UserYzm.objects.filter(telephone=telephone).values())[0]
            # print(duanxinm)
            if duanxinm['dx']==dxyzm:
                if float(duanxinm['dxtime'])+300>time.time():
                    user = {
                        "telephone": telephone,
                        "userpassword": jiami(pwd)
                    }
                    result = addUser(user)
                    return result
                else:
                    return {'code':'505'}#已过时
            else:
                return {'code':'405'}       #短信验证码不正确
        except Exception as ex:
            print(ex)
            return {'code': '405'}
    except Exception as ex:
        print(ex)
        return {'code': '407'}       #输入出错

def checkuser(tel):
    try:
        print(tel)
        uu=models.UserLogin.objects.filter(telephone=tel).first()
        print(uu)
        if not uu:
            return {'code':'207'}
        else:
            return {'code':'407'}
    except Exception as ex:
        print(ex)
        return {'code':'404'}

def getusermessage(userphone):
    try:
        guanzhu=models.UserFans.objects.filter(phone=userphone).count()
        fans=models.UserFans.objects.filter(beattephone=userphone).count()
        sign=list(models.UserInform.objects.filter(userphone=userphone).values('usersign','usernickname','headportraitid__picture'))[0]
        return {'code':'209','guanzhu':guanzhu,'fans':fans,'sign':sign}
    except Exception as ex:
        print(ex)
        return {'code':'409'}

def getallmessage(myid):
    try:
        res=list(models.UserInform.objects.filter(userphone=myid).values('headportraitid__picture','usernickname','userphone__telephone','professionid__userinform__useremail','usersex','headportraitid__userinform__userbriday','userprovince','userphone__userinform__usercity',
                                                                         'headportraitid__userinform__professionid__occupation'
                                                                         ,'usersign'))[0]
    except Exception as ex:
        pass
    try:
        res['headportraitid__userinform__userbriday']=str(res['headportraitid__userinform__userbriday']).split(' ')[0]
        print(res)

    except Exception as ex:
        print(ex)
        res={}
    return res


def addUser(user):
    try:
        user['userphone']=user['telephone']
        user['usernewlogintime']=datetime.now()
        user['registtime']=datetime.now()
        res=models.UserLogin.objects.create(**user)
        userinform={
            "userphone_id":user['telephone'],
            "headportraitid_id":1,
            "usernickname":'米农用户'
        }
        resinform=models.UserInform.objects.create(**userinform)
        uu=list(models.UserInform.objects.filter(userphone=user['telephone']).values('usernickname','headportraitid__picture'))
        if resinform:
            return {'code':'203','id':user['userphone'],'uu':uu}
        else:
            return {'code':'403'}       #已存在
    except Exception as ex:
        print(ex)
        return {'code':'405'}   #未知错误

def getcookbookuser(id):
    try:
        userp=model.CookbookIntroduce.objects.filter(baseid=id).values('userphone')[0]['userphone']
        user=list(models.UserInform.objects.filter(userphone_id=userp).values('headportraitid__picture','usernickname'))[0]
        user['cookbooktime']=str(model.CookbookIntroduce.objects.get(baseid=id).uploadtime).split(' ')[0]
        user['cnum']=len(list(model.CookbookIntroduce.objects.filter(userphone_id=userp).values('id')))
        print(user['cnum'])
        user['guanzhu']=len(list(models.UserFans.objects.filter(phone_id=userp).values('id')))
        user['fans']=len(list(models.UserFans.objects.filter(beattephone_id=userp).values('id')))
        user['browl']=list(model.CookbookBrowse.objects.filter(cookbookid_id=id).values('userphone'))
        aa=set()
        for i in user['browl']:
            aa.add(i['userphone'])
        user['browl']=len(aa)
        user['code']='230'
        print(userp)
        user['ph']=userp
        # print(user)
        return user
    except Exception as ex:
        print(ex)
        return {'code':'430'}
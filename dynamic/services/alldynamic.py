from dynamic import models
import json


#获取所有动态
def getalldynamic(condition):
    try:
        dynamics = []
        if condition:
            list1 = models.DynamicLabel.objects.filter(label=condition).values('dynamicid', 'dynamicid__picuture',
                                                                               'dynamicid__title', 'dynamicid__time',
                                                                               'dynamicid__userphone__userinform__usernickname',
                                                                               'dynamicid__userphone__userinform__headportraitid__picture',
                                                                               'dynamicid__userphone')
            for i in list1:
                li = {
                    'id': i["dynamicid"],
                    'picuture': i["dynamicid__picuture"],
                    'title': i["dynamicid__title"],
                    'time': str(i["dynamicid__time"]).split(' ')[0],
                    'userNickname': i["dynamicid__userphone__userinform__usernickname"],
                    'picture': i["dynamicid__userphone__userinform__headportraitid__picture"],
                    'userid': i["dynamicid__userphone"]
                }
                dynamics.append(li.copy())
        else:
            list1 = models.UserDynamic.objects.all().values('id', 'picuture', 'title', 'time',
                                                            'userphone__userinform__usernickname',
                                                            'userphone__userinform__headportraitid__picture',
                                                            'userphone')
            for i in list1:
                li = {
                    'id': i["id"],
                    'picuture': i["picuture"],
                    'title': i["title"],
                    'time': str(i["time"]).split(' ')[0],
                    'userNickname': i["userphone__userinform__usernickname"],
                    'picture': i["userphone__userinform__headportraitid__picture"],
                    'userid': i["userphone"]
                }
                dynamics.append(li.copy())
        return dynamics
    except Exception as ex:
        print(ex)
        return []

#根据动态获取标签
def getflagbyid(dyid):
    try:
        label=list(models.DynamicLabel.objects.filter(dynamicid=dyid).values('id','label'))
    except Exception as ex:
        print(ex)
        label=[]
    return label

#获取用户发的四条动态
def getflagbyuserid(userid):
    try:
        dy=[]
        fourdynamic1=list(models.UserDynamic.objects.filter(userphone=userid)[:5].values('id','picuture','title','time','userphone__userinform__usernickname','userphone__userinform__headportraitid__picture'));
        for i in fourdynamic1:
            li = {
                'id': i["id"],
                'picuture': i["picuture"],
                'title': i["title"],
                'time': str(i["time"]).split(' ')[0],
                'userNickname': i["userphone__userinform__usernickname"],
                'picture': i["userphone__userinform__headportraitid__picture"],
            }
            dy.append(li.copy())
    except Exception as ex:
        print(ex)
        dy=[]
    return dy

#根据动态id获取动态详细信息
def getflagbydyid(dyid):
    try:
        dyinfo1=list(models.UserDynamic.objects.filter(id=dyid)[:1].values('id','picuture','title','time','userphone__userinform__usercity','userphone__userinform__professionid__occupation','userphone__userinform__usernickname','userphone__userinform__headportraitid__picture','userphone','content'));
        dy=cunshuju(dyinfo1)
    except Exception as ex:
        print(ex)
        dy=[]
    return dy


#给数据换个好用的名字
def cunshuju(lis):
    dynamics = []
    for i in lis:
        li = {
            'id': i["id"],
            'picuture': i["picuture"],
            'title': i["title"],
            'time': str(i["time"]).split(' ')[0],
            'userNickname': i["userphone__userinform__usernickname"],
            'picture': i["userphone__userinform__headportraitid__picture"],
            'userid': i["userphone"],
            'content': i["content"],
            'city': i["userphone__userinform__usercity"],
            'occupation': i["userphone__userinform__professionid__occupation"],
        }
        dynamics.append(li.copy())
    return dynamics

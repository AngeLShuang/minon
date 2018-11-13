from .. import models

def getuserdynamic(userphone):
    try:
        li=list(models.UserDynamic.objects.filter(userphone=userphone).values()[:100])
        for i in range(len(li)):
            li[i]['time']=str(li[i]['time']).split(' ')[0]
        li = sorted(li, key=lambda t: t['time'], reverse=True)
        return li[:30]
    except Exception as ex:
        print(ex)
        return []



# 根据菜谱id删除动态
def deluserdynamic(id):
    try:
        models.UserDynamic.objects.filter(id=id).delete()
    except Exception as ex:
        print(ex)
        return []
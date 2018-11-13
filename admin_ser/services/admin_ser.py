from .. import models

def getadmin(tel):
    try:
        usermes=list(models.user_inform.objects.filter(userPhone=tel).values())#取到字典列表
        adminlogin=list(models.admin.objects.filter(userPhone=tel).values())#取到字典列表
        for i in range(len(usermes)):
            usermes[i]['userBriday']=str(usermes[i]['userBriday']).split(' ')[0]
        # print(adminlogin)
        usermes[0]['telephone']=adminlogin[0]['telephone']
        return usermes[0]
    except Exception:
        pass
    return {'code':'500'}
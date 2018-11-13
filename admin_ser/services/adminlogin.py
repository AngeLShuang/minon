from .. import models

def login_aser(user):
    try:
        print(user)
        usermes=list(models.admin.objects.filter(telephone=user['tel']).values())#取到字典列表
        print(usermes)
        if str(usermes[0]['isadmin'])=='1':
            if user['password'] == usermes[0]['userPassword']:
                result = {
                    'code': '201',
                    'id': usermes[0]['telephone']
                }
            else:
                result = {'code': '402'}
            return result
    except Exception:
        pass
    return {'code':'500'}
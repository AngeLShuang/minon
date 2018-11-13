from .. import models


#根据动态id获取动态评论
def getcommentbydyid(id):
    try:
        aa=list(models.DynamicComment.objects.filter(dynamicid=id).values('id','time','content','firstcomment','userphone__userinform__usernickname','userphone__userinform__headportraitid__picture',))
        for i in range(len(aa)):
            aa[i]['time']=str(aa[i]['time'])
            pic=list(models.DynamiccommentPicuture.objects.filter(dynamiccomid=aa[i]['id']).values('picturesrc'))
            aa[i]['pic']=pic
        aa=aa[::-1]
        return aa
    except Exception as ex:
        print(ex)

def setcommentyuan(comment,pictures):
    try:
        res = models.DynamicComment.objects.create(**comment)
        if pictures:
            for p in pictures:
                pic = {
                    "dynamiccomid": comment['userphone_id'],
                    "picturesrc": p,
                }
                resinform = models.DynamiccommentPicuture.objects.create(**pic)
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}  # 已存在
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误

def setcomment(comment):
    try:
        res=models.DynamicComment.objects.create(**comment)
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}  # 已存在
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误


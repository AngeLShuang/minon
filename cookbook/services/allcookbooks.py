from .. import models
import json


def getallcookbooks(name,jishu):

    try:
        li=[]
        lists=models.CookbookBasic.objects.filter(cookbookname__icontains=name).all()[(jishu-1)*18:jishu*18]
        for i in lists:
            id=i.id
            list2=models.CookbookIntroduce.objects.filter(baseid=id).values('baseid__belongto','baseid__cookbookpictures','baseid__cookbookname','styleid__stylename','tasteid__tastelabel','userphone__userinform__usernickname','userphone','baseid')
            collect=models.CookbookCollection.objects.filter(cookbookid=id).count()
            comment=models.CookbookComment.objects.filter(cookbookid=id).count()
        #     遍历获取的数据
            for l in list2:
                l['collect']=collect
                l['comment']=comment
                li.append(l)
        return li
    except Exception as ex:
        pass



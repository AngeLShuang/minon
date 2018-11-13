
from .. import models

def shicaiName(name):


    res=list(models.CookbookFoodintro.objects.filter(foodname=name).values())
    for i in range(len(res)):
        res[i]['gongxiao']=str(res[i]['gongxiao']).split(',')




    # 根据食材找菜谱
    return res




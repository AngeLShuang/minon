from cookbook import models

def getfoodByPhonecheck(data):
    try:
        cb=list(models.CookbookIntroduce.objects.filter(userphone=data["userid"],admincheck=1).values("baseid__cookbookname","baseid","totalpictures")[(data["index"]-1)*data["num"]:data["index"]*data["num"]])
        return cb
    except Exception as ex:
        print(ex)
        return []

def getnotfoodByPhonecheck(data):
    try:
        cb=list(models.CookbookIntroduce.objects.filter(userphone=data["userid"],admincheck__in=[0,2]).values("baseid__cookbookname","baseid","totalpictures","admincheck")[(data["index"]-1)*data["num"]:data["index"]*data["num"]])
        return cb
    except Exception as ex:
        print(ex)
        return []

def getPagecount(data):
    try:
        count=models.CookbookIntroduce.objects.filter(userphone=data["userid"],admincheck=1).count()
        return count
    except Exception as ex:
        print(ex)
        return 0

def getnotPagecount(data):
    try:
        count=models.CookbookIntroduce.objects.filter(userphone=data["userid"],admincheck__in=[0,2]).count()
        return count
    except Exception as ex:
        print(ex)
        return 0
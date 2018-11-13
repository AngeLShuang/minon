from cookbook import models
from user import models as model
import json

def getallcookbook(jishu):
    try:
        # cookbooks=[]
        # list1=models.CookbookIntroduce.objects.values('baseid','baseid__cookbookname','baseid__belongto','baseid__cookbookpictures',)
        print(jishu)
        cookbooks = []
        list1 = list(models.CookbookBasic.objects.all().values())[(jishu - 1) * 18:jishu * 18]
        for i in list1:
            a = {
                    'id': i['id'],
                    'cookbookname': i['cookbookname'],
                    'belongto': i['belongto'],
                    'cookbookpictures': i['cookbookpictures']
                }
            try:
                other = list(models.CookbookIntroduce.objects.filter(baseid=i['id']).values('efficacy', 'userphone',
                                                                                         'userphone__userinform__usernickname',
                                                                                         'tasteid__tastelabel',
                                                                                         'styleid__stylename'))[0]

            except Exception as ex:
                other={}
                other['efficacy']=''
                # print(other, 111111111)
            commentcount = models.CookbookCollection.objects.filter(cookbookid=i['id']).count()
            browsecount = models.CookbookBrowse.objects.filter(cookbookid=i['id']).count()
            a['efficacyone'] = str(other['efficacy']).split(',')[0]
            a['comment'] = commentcount
            a['browse'] = browsecount
            a['other'] = other
            cookbooks.append(a.copy())
        return cookbooks
    except Exception as ex:
        print(ex)
        return []

def getallrec(jishu,saixuan):
    try:
        from django.db import connection, connections
        from .dictchange import dictfetchall
        cursor = connection.cursor()  # cursor = connections['default'].cursor()
        cursor.execute("SELECT * from cookbook_basic A inner join cookbook_introduce B on A.id=B.baseId inner join cookbook_style C on B.styleId=C.id inner join cookbook_taste D on B.tasteId=D.id  where D.tasteLabel like '%{}%' limit {},{}".format(saixuan,(int(jishu)-1)*30,int(jishu)*30))
        row = dictfetchall(cursor)
        for i in range(len(row)):
            cllect = models.CookbookCollection.objects.filter(cookbookid_id=row[i]['baseId']).count()
            browl = models.CookbookBrowse.objects.filter(cookbookid_id=row[i]['baseId']).count()
            row[i]['cllect']=cllect
            row[i]['browl']=browl
            row[i]['uploadTime'] = str(row[i]['uploadTime']).split(' ')[0]
            row[i]['efficacyone'] = str(row[i]['efficacy']).split(',')[0]
            usernickname=model.UserInform.objects.get(userphone_id=row[i]['userPhone']).usernickname
            row[i]['userNickname']=usernickname
        # print(row)
        # print("SELECT * from cookbook_basic A inner join cookbook_introduce B on A.id=B.baseId inner join cookbook_style C on B.styleId=C.id inner join cookbook_taste D on B.tasteId=D.id INNER join user_inform E on B.userPhone=E.userphone_id where D.tasteLabel like '%{}%' limit {},{}".format(saixuan,(int(jishu)-1)*30,int(jishu)*30))
        return row
    except Exception as ex:
        print(ex)

# 从数据库里取出口味儿数据
def getalltaste():
    try:
        taste = []
        list1 = list(models.CookbookTaste.objects.all().values())
        for i in list1:
            if i['tastelabel'] and i['tastelabel'] not in taste:
                taste.append(i['tastelabel'])
        return taste
    except Exception as ex:
        print(ex)

def getallsea(message):
    try:
        from django.db import connection, connections
        from .dictchange import dictfetchall
        cursor = connection.cursor()  # cursor = connections['default'].cursor()
        cursor.execute("SELECT * from cookbook_basic A inner join cookbook_introduce B on A.id=B.baseId inner join cookbook_style C on B.styleId=C.id inner join cookbook_taste D on B.tasteId=D.id INNER join user_inform E on B.userPhone=E.userphone_id where cookbookName like '%{}%' and A.belongTo like '%{}%' and C.styleName like '%{}%' and D.tasteLabel like '%{}%' limit {},{}".format(message['search'],message['gongyi'],message['dq'],message['kw'],(int(message['jishu'])-1)*30,int(message['jishu'])*30))

        row = dictfetchall(cursor)
        for i in range(len(row)):
            cllect = models.CookbookCollection.objects.filter(cookbookid_id=row[i]['id']).count()
            browl = models.CookbookBrowse.objects.filter(cookbookid_id=row[i]['id']).count()
            row[i]['cllect']=cllect
            row[i]['browl']=browl
            row[i]['uploadTime'] = str(row[i]['uploadTime']).split(' ')[0]
            row[i]['userBriday'] = str(row[i]['userBriday']).split(' ')[0]
        return row
    except Exception as ex:
        print(ex)

def getallpage(message):
    try:
        num=0
        base = list(models.CookbookBasic.objects.filter(cookbookname__contains=str(message['search']).strip(),
                                                        belongto__contains=str(message['gongyi']).strip()).values(
            'id'))
        for i in base:
            res=models.CookbookIntroduce.objects.filter(baseid_id=i['id'],
                                                        styleid__stylename__icontains=str(message['dq']).strip(),
                                                        tasteid__tastelabel__icontains=str(message['kw']).strip()).count()
            if res:
                num+=res
    except Exception as ex:
        print(ex)
        num=0
    return {'count':num}

# 从数据库里取出食材数据
def getallshicai(count):
    try:
        shicai = []
        list2 = list(models.CookbookFoodintro.objects.filter().values('foodname'))
        for i in list2:
            shicai.append(i)
        return shicai
    except  Exception as ex:
        print(ex)

# 从数据库里取出部分满足条件的菜谱数据
def getbfkw(con):
    try:
        cookbook = []
        rng = list(models.CookbookTaste.objects.filter(tastelabel__icontains=con.strip()).values('id'))[:18]
        for r in rng:
            xiaocji = list(models.CookbookIntroduce.objects.filter(tasteid=r['id']).values('userphone', 'baseid',
                                                                                           'styleid__stylename',
                                                                                           'tasteid__tastelabel',
                                                                                           'baseid__cookbookname',
                                                                                           'baseid__belongto',
                                                                                           'efficacy',
                                                                                           'userphone__userinform__usernickname',
                                                                                           'baseid__cookbookpictures'))
            for i in range(len(xiaocji)):
                comment = models.CookbookCollection.objects.filter(cookbookid=xiaocji[i]['baseid']).count()
                xiaocji[i]['comment'] = comment
                browse = models.CookbookBrowse.objects.filter(cookbookid=xiaocji[i]['baseid']).count()
                xiaocji[i]['browse'] = browse
                cookbook.append(xiaocji)

        cook = []

        for i in range(len(cookbook)):
            a = {}
            a['id'] = cookbook[i][0]['baseid']
            a['cookbookname'] = cookbook[i][0]['baseid__cookbookname']
            a['cookbookpictures'] = cookbook[i][0]['baseid__cookbookpictures']
            a['belongto'] = cookbook[i][0]['baseid__belongto']
            a['comment'] = cookbook[i][0]['comment']
            a['browse'] = cookbook[i][0]['browse']
            aa = {}
            a['efficacyone'] = cookbook[i][0]['efficacy'].split(',')[0]

            aa['efficacy'] = cookbook[i][0]['efficacy']
            aa['userphone'] = cookbook[i][0]['userphone']
            aa['styleid__stylename'] = cookbook[i][0]['tasteid__tastelabel']
            aa['tasteid__tastelabel'] = cookbook[i][0]['styleid__stylename']
            aa['userphone__userinform__usernickname'] = cookbook[i][0]['userphone__userinform__usernickname']
            a['other'] = aa
            cook.append(a.copy())

        return cook
    except Exception as ex:
        print(ex)
        return []


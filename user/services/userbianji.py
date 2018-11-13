from user import models
from cookbook import models as model


def bianji(id):
    try:
        allshuju = []
        # edg=list(model.CookbookIntroduce.objects.filter(baseid=id).values('baseid__cookbookmarche__stepcontent','baseid__cookbookmarche__picturesrc','baseid__cookbookmarche__stepnumber','userphone','baseid','styleid__stylename','tasteid__tastelabel','baseid__cookbookname','baseid__belongto','efficacy','userphone__userinform__usernickname','baseid__cookbookpictures'))
        edg = list(model.CookbookIntroduce.objects.filter(baseid=id).values( 'efficacy','detailintroduce','userphone', 'baseid', 'styleid__stylename',
                                                                            'tasteid__tastelabel',
                                                                            'baseid__cookbookname','baseid__cookbookpictures', 'baseid__belongto',                                                      'baseid__cookbookcbfood__foodfu'))

        for i in range(len(edg)):
            liao=list(model.CookbookCbfood.objects.filter(cookbookid_id=edg[i]['baseid']).values('foodzhu','foodfu'))[0]
            buzou=list(model.CookbookMarche.objects.filter(cookbookid_id=edg[i]['baseid']).values())
            edg[i]['buzou']=buzou
            edg[i]['efficacy']=str(edg[i]['efficacy']).split(',')
            edg[i]['foodzhu']=str(liao['foodzhu']).split(',')
            edg[i]['foodfu']=str(liao['foodfu']).split(',')
        print(edg)
        return edg[0]
    except Exception as ex:
        print(ex)

from dynamic import models
import json

def pubDynamicbyphone(dynamic):
    try:
        dy={
            "userphone_id":dynamic["userphone"],
            "content":dynamic["content"],
            "picuture":dynamic["picuture"],
            "title":dynamic["title"]
        }
        res = models.UserDynamic.objects.create(**dy)
        if dynamic["label"]:
            for l in dynamic["label"]:
                label = {
                    "dynamicid_id": res.id,
                    "label": l,
                }
                resinform = models.DynamicLabel.objects.create(**label)
        if res:
            return {'code': '205'}
        else:
            return {'code': '405'}  # 已存在
    except Exception as ex:
        print(ex)
        return {'code': '405'}  # 未知错误
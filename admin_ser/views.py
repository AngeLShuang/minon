from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
import json
from .make_token import makeToken
from .services.adminlogin import *
from .services.admin_ser import *
# Create your views here.

def adminindex(request):
    return HttpResponse('here is admin_ser user')

def adminlogin(request):
    user = json.loads(request.body)
    # print(user)
    res = login_aser(user)
    if res['code'] == '201':
            resp = JsonResponse(res)
            token = makeToken(res['id'])
            resp['token'] = token
            resp["Access-Control-Expose-Headers"] = "token"
            # print(resp['token'])
            return resp
    else:
        return JsonResponse({'code': '401'})

def getadminmessage(request):
    user = request.GET.get('tel')
    usermessage=getadmin(user)
    print(usermessage)
    return HttpResponse(json.dumps(usermessage,ensure_ascii=False))
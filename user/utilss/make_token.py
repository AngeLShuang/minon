import jwt
from datetime import datetime,timedelta
# from djangotext.settings import SECRET_KEY
SECRECT_KEY='cyc'
def makeToken(tel):
    datetimeInt=datetime.utcnow()+timedelta(hours=1)
    options={
        'iss':'tiantian.com',
        'exp':datetimeInt,
        'aud':'webkit',
        'message':tel
    }
    token=jwt.encode(options,SECRECT_KEY,'HS256').decode()
    return token

def openToken(token):
    data=jwt.decode(token, SECRECT_KEY,audience='webkit', algorithms=['HS256'])
    return data

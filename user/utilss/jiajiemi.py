from werkzeug.security import generate_password_hash,check_password_hash

def jiami(pwd):
    jiami_pwd = generate_password_hash(pwd, method='pbkdf2:sha1:2000', salt_length=8)
    return jiami_pwd

def jiemi(pwd,getpwd):
    return check_password_hash(getpwd, pwd)
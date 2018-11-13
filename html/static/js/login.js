let yzmnum;
let from=sessionStorage.getItem('from');
let url;
let telephone = document.querySelector('#inputTel3');
let password = document.querySelector('#inputPassword3');
let keydownyzm = document.querySelector('.form-control.keydownyzm');
let loginbtn = document.querySelector('#login');
let showerror = document.querySelector('.error');
let teltext = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
let pwdtext = /^\w{1,17}$/;
let remb = document.querySelector('#chkibput');
let tel_local = localStorage.getItem('telephone');
let pwd_local = localStorage.getItem('password');
$(function () {
    if (tel_local && pwd_local) {
        telephone.value = tel_local;
        password.value = pwd_local;
    }
    getyzm();
});


//登录验证-------------------

//点击登录
loginbtn.onclick = function () {
    if (checkshuju()) {
        let user = {
            'telephone': telephone.value,
            'password': password.value
        };
        $.ajax(
            {
                url: uurl+'user/login/',
                type: 'post',
                data: JSON.stringify(user),
                dataType: 'json',
                success: function (res, n, xhr) {
                    if (res.code == '201') {
                        showerror.innerHTML = '';
                        sessionStorage.setItem('telephone',telephone.value);
                        sessionStorage.setItem('id',res.id);
                        sessionStorage.setItem('user',JSON.stringify(res.user));
                        sessionStorage.setItem('flag',true);
                        sessionStorage.setItem('token', xhr.getResponseHeader('token'));
                        if (remb.checked) {
                            localStorage.setItem('telephone', telephone.value);
                            localStorage.setItem('password', password.value);
                        } else {
                            localStorage.clear()
                        }

                        if(from){
                            url=from
                        }else{
                            url='../index.html'
                        }
                        window.location.href = url
                    } else if (res.code == '402') {
                        showerror.innerHTML = '用户名或密码不匹配';
                        telephone.focus();
                    } else if (res.code == '405') {
                        showerror.innerHTML = '用户不存在';
                    } else {
                        showerror.innerHTML = '请刷新重试';
                    }
                        getyzm();
                },
                error: function () {
                    console.log('504');
                },
            }
        )
    }

};

//更换图形验证码
$('.col-sm-5.yzmimg img').click(function () {
    getyzm();
});

//手机号验证
telephone.oninput = function () {
    if (teltext.test(telephone.value)) {
        $(telephone).removeClass('redborder');
        showerror.innerHTML = '';
    } else {
        $(telephone).addClass('redborder');
        showerror.innerHTML = '手机号格式不对';
    }
};
//密码验证
password.oninput = function () {
    if (pwdtext.test(password.value)) {
        $(password).removeClass('redborder');
        showerror.innerHTML = '';
    } else {
        $(password).addClass('redborder');
        showerror.innerHTML = '密码长度为 6-18位';
    }
};

//验证码输入与判断
keydownyzm.oninput = function () {
    //here  if 内
    // yzmnum.toLowerCase()==keydownyzm.value.toLowerCase()
    if (yzmnum.toLowerCase() == keydownyzm.value.toLowerCase()) {
        $(keydownyzm).removeClass('redborder');
        // $(keydownyzm).addClass('greenborder');
        $(keydownyzm).css('color', 'black');
        showerror.innerHTML = '';
    } else {
        // $(keydownyzm).removeClass('greenborder');
        $(keydownyzm).addClass('redborder');
        $(keydownyzm).css('color', 'red');
        showerror.innerHTML = '验证码不匹配';
    }
};

//得到python图形验证码
function getyzm() {
    $.ajax(
        {
            url: uurl+'user/login/',
            type: 'get',
            data: null,
            dataType: 'json',
            success: function (res) {
                yzmnum = res.yzm;
                $('.col-sm-5.yzmimg img').attr('src', 'data:image/jpg;base64,' + res.src)
            },
            error: function () {
                console.log('404');
            },
        }
    )
}

function checkshuju() {
    let flag = false;
    if (!teltext.test(telephone.value)) {
        telephone.focus();
        $(telephone).addClass('redborder');
        showerror.innerHTML = '手机号格式不对';
    } else if (!pwdtext.test(password.value)) {
        password.focus();
        $(password).addClass('redborder');
        showerror.innerHTML = '密码长度为 6-18位';
    } else if (!yzmnum.toLowerCase() == keydownyzm.value.toLowerCase()) {
        keydownyzm.focus();
        $(keydownyzm).addClass('redborder');
        $(keydownyzm).css('color', 'red');
        showerror.innerHTML = '验证码不匹配';
    } else {
        flag = true;
    }
    return flag
}

//登录验证-------------------end\

//注册 开始
let tele_input = document.querySelector('#inputTel4');
let pwd_input = document.querySelector('#inputPassword4');
let pwd2_input = document.querySelector('#inputPassword2');
let registbtn = document.querySelector('.btn.btn-primary.registbtn');
let regerror = document.querySelector('.errorregist');
let duanxin = document.querySelector('#txt_ver');
let duanxingyzm = /^\w{6}$/;
let password_text = /^[a-zA-Z]\w{5,17}$/;
let errorregisty = document.querySelector('.errorregisty');
let errorregistp = document.querySelector('.errorregistp');
let errorregistp2 = document.querySelector('.errorregistp2');
let getduanxin = document.querySelector('.btn.btn-primary.getyzm');
let scen = 60;
let tt;
let xieyicheck=document.querySelector('#chk_clause');
$(duanxin).attr('disabled', true);

//输入手机号后才能点击获取验证码
$(getduanxin).attr('disabled', true);


//显示计时器到页面


//生成计时器
function jishiqi() {
    tt = setInterval(function () {
        $(getduanxin).attr('disabled',true);
        getduanxin.innerText = --scen + '秒';
        if (scen < 1) {
            clearInterval(tt);
            getduanxin.innerText = '点我获取验证码';
            $(getduanxin).removeAttr('disabled');
            scen = 60;
        }
    }, 1000)
}

//验证
tele_input.oninput = function () {
    if (teltext.test(tele_input.value)) {
        $(tele_input).removeClass('redborder');
        regerror.innerHTML = '';
        if(scen==60){
            if(tele_input.value.length==11){
            $.ajax({
                url:uurl+'user/getuser/',
                type:'get',
                data:{'tel':tele_input.value},
                dataType:'json',
                success:function (res) {
                    if(res.code==207){
                        setTimeout(function () {
                            $(tele_input).removeClass('redborder');
                            $(getduanxin).removeAttr('disabled');
                        },100)
                    }else{
                        $(tele_input).addClass('redborder');
                        regerror.innerHTML = '用户已存在';
                        $(getduanxin).attr('disabled',true);
                    }
                },
                error:function () {
                    console.log('请重试');
                }
            })
        }
        }
    } else {
        $(getduanxin).attr('disabled',true);
        $(tele_input).addClass('redborder');
        regerror.innerHTML = '手机号格式不对';
    }
};

duanxin.oninput = function () {
    if (duanxingyzm.test(duanxin.value)) {
        $(duanxin).removeClass('redborder');
        errorregisty.innerHTML = '';
    } else {
        $(duanxin).addClass('redborder');
        errorregisty.innerHTML = '验证码是6位';
    }

};
pwd_input.oninput = function () {
    if (password_text.test(pwd_input.value)) {
        $(pwd_input).removeClass('redborder');
        errorregistp.innerHTML = '';
        if (pwd_input.value == pwd2_input.value) {
            $(pwd2_input).removeClass('redborder');
            errorregistp2.innerHTML = '';
        } else {
            $(pwd2_input).addClass('redborder');
            errorregistp2.innerHTML = '两次密码不一致';
        }
    } else {
        $(pwd_input).addClass('redborder');
        errorregistp.innerHTML = '以字母开头，长度在6~18之间，只能包含字符、数字和下划线';
    }

};

pwd2_input.oninput = function () {
    if (pwd_input.value == pwd2_input.value) {
        $(pwd2_input).removeClass('redborder');
        errorregistp2.innerHTML = '';
    } else {
        $(pwd2_input).addClass('redborder');
        errorregistp2.innerHTML = '两次密码不一致';
    }

};

//总验证
function checkregist() {
    let flag=false;
    if (! teltext.test(tele_input.value)){
        tele_input.focus();
        $(tele_input).addClass('redborder');
        regerror.innerHTML = '手机号格式不对';
    }else if(! duanxingyzm.test(duanxin.value)){
        duanxin.focus();
        $(duanxin).addClass('redborder');
        errorregisty.innerHTML = '验证码是6位';
    }else if(! password_text.test(pwd_input.value)){
        pwd_input.focus();
        $(pwd_input).addClass('redborder');
        errorregistp.innerHTML = '以字母开头，长度在6~18之间，只能包含字符、数字和下划线';
    }else if(! pwd_input.value == pwd2_input.value){
        pwd2_input.focus();
        $(pwd2_input).addClass('redborder');
        errorregistp2.innerHTML = '两次密码不一致';
    }else{
        flag=true;
    }
    if(! xieyicheck.checked){
        document.querySelector('.errorregist.errxieyi').innerText='请先勾选协议';
        return false;
    }else{
        document.querySelector('.errorregist.errxieyi').innerText=''
    }
    return flag
}

//获取验证码
getduanxin.onclick=function(){
    if (scen == 60) {
        jishiqi();
        getduanxin.innerText = scen + '秒';
        $(duanxin).removeAttr('disabled');
        $(getduanxin).attr('disabled', true);
        let telephone_in = {
            'tel': tele_input.value
        };
        $.ajax({
            url: uurl+'user/getduanxinyz/',
            type: 'get',
            data: telephone_in,
            success: function (res) {
                if(res.code=='409'){
                    $(getduanxin).attr('disabled', true);
                    $(duanxin).attr('disabled', true);
                    $(registbtn).attr('disabled', true);
                    $(pwd_input).attr('disabled', true);
                    $(pwd2_input).attr('disabled', true);
                    clearInterval(tt);
                    errorregisty.innerHTML = '尝试次数过多,请1个小时后重试';
                    getduanxin.innerText = '点我获取验证码';
                    scen = 60;
                }else if(res.code=='209'){
                    errorregisty.innerHTML = '';
                    $(getduanxin).removeAttr('disabled');
                    $(duanxin).removeAttr('disabled');
                    $(registbtn).removeAttr('disabled');
                    $(pwd_input).removeAttr('disabled');
                    $(pwd2_input).removeAttr('disabled');
                }
            },
            error: function () {
                console.log('404');
            },
        })
    }
};

//注册
registbtn.onclick=function () {
    let user={
        'telephone':tele_input.value,
        'password':pwd_input.value,
        'dxyzm':duanxin.value
    };
  if(checkregist()){
        $.ajax({
            url: uurl+'user/regist/',
            type: 'post',
            data: JSON.stringify(user),
            success: function (res,n,xhr) {
                if(res['code']=='203'){
                   sessionStorage.setItem('flag',true);
                   sessionStorage.setItem('telephone',tele_input.value);
                   sessionStorage.setItem('id',res.id);
                   sessionStorage.setItem('token', xhr.getResponseHeader('token'));
                   sessionStorage.setItem('user',JSON.stringify(res.uu));
                   window.location.href = '../index.html'
                }else{
                    console.log(res);
                }
            },
            error: function () {
                console.log('404');
            },
        })

  }
};

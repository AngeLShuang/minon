let telinput = document.querySelector('#pwdphone');
let getbyzm = document.querySelector('.btn.btn-primary.getyzm');
let getiyzm = document.querySelector('.form-control.yanzheng-phone');
let oldpwd = document.querySelector('.form-control.oldpwd');
let newpwd = document.querySelector('.form-control.new');
let newpwd2 = document.querySelector('.form-control.new2');
let teltext = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
let err=document.querySelector('.error');
let surepwd=document.querySelector('.btn.btn-primary.surepwd');
let scen = 60;

$(getbyzm).attr('disabled', true);
$(getiyzm).attr('disabled', true);
getiyzm.setAttribute('placeholder','请先输入手机号');
//手机号验证
telinput.oninput = function () {
    if (teltext.test(telinput.value)) {
        getiyzm.setAttribute('placeholder','请先输入验证码');
        err.innerHTML = '';
        if (telinput.value.length == 11) {
            $.ajax({
                url: uurl+'user/getuser/',
                type: 'get',
                data: {'tel': telinput.value},
                dataType: 'json',
                success: function (res) {

                    if (res.code == 207) {
                        $(telinput).addClass('redborder');
                        err.innerHTML = '用户不存在';
                        $(getbyzm).attr('disabled', true);
                    } else {
                        setTimeout(function () {
                            $(telinput).removeClass('redborder');
                            $(getbyzm).removeAttr('disabled');
                        }, 100)
                    }
                },
                error: function () {
                    console.log('请重试');
                }
            })
        }
        // $(telinput).removeClass('redborder');
        // $(getbyzm).removeAttr('disabled');
    } else {
        $(getbyzm).attr('disabled', true);
        $(telinput).addClass('redborder');
        err.innerHTML = '手机号格式不对';
    }
};

getbyzm.onclick = function () {
    sendyzm()
};

//生成计时器
function jishiqi() {
    tt = setInterval(function () {
        $(getbyzm).attr('disabled', true);
        $(getiyzm).removeAttr('disabled');
        getbyzm.innerText = --scen + '秒';
        if (scen < 1) {
            clearInterval(tt);
            getbyzm.innerText = '点我获取验证码';
            $(getbyzm).removeAttr('disabled');
            scen = 60;
        }
    }, 1000)
}

function sendyzm() {
    if (scen == 60 && teltext.test(telinput.value) && telinput.value==myid) {
        jishiqi();
        $(getiyzm).removeAttr('disabled');
        let telephone_in = {
            'tel': telinput.value
        };
        $.ajax({
            url: uurl+'user/getduanxinyz/',
            type: 'get',
            data: telephone_in,
            success: function (res) {
                if(res.code=='409'){
                    $(getbyzm).attr('disabled', true);
                    $(getiyzm).attr('disabled', true);
                    $(oldpwd).attr('disabled', true);
                    $(newpwd).attr('disabled', true);
                    $(newpwd2).attr('disabled', true);
                    clearInterval(tt);
                    errorregisty.innerHTML = '尝试次数过多,请1个小时后重试';
                    getduanxin.innerText = '点我获取验证码';
                    scen = 60;
                }else if(res.code=='209'){
                    err.innerHTML = '';
                    $(getbyzm).removeAttr('disabled');
                    $(getiyzm).removeAttr('disabled');
                    $(oldpwd).removeAttr('disabled');
                    $(newpwd).removeAttr('disabled');
                    $(newpwd2).removeAttr('disabled');
                }
            },
            error: function () {
                console.log('404');
            },
        })
    }
}

//确定修改
surepwd.onclick=function () {
    if(teltext.test(telinput.value)){
        $(telinput).removeAttr('redborder');
        err.innerHTML = '';
        if(getiyzm.value.length){
            $(getiyzm).removeAttr('redborder');
            err.innerHTML = '';
            let uu={
                        'telephone':telinput.value,
                        'pwd':oldpwd.value,
                        'newpwd':newpwd.value,
                        'newpwd2':newpwd2.value,
                        'duanxin':getiyzm.value,
                        };
            if(newpwd.value==newpwd2.value){
                $.ajax({
                    url:uurl+'user/changeUserPassword/',
                    type:'post',
                    data:JSON.stringify(uu),
                    success:function (res) {
                        res=JSON.parse(res);
                        if(res.code=='206'){
                            alert('成功');
                            sessionStorage.clear()
                        }else if(res.code=='406'){
                            alert('旧密码错误')
                        }else if(res.code=='405'){
                            alert('验证码不正确或已过期')
                        }else{
                            alert('请刷新重试')
                        }
                    },
                    error:function () {
                        console.log('404');
                        }
                    })
            }else{
                $(newpwd2).addClass('redborder');
                err.innerHTML = '两次密码不一致';
            }
        }else{
            $(getiyzm).addClass('redborder');
            err.innerHTML = '验证码不可为空';
        }
    }else{
        $(telinput).addClass('redborder');
        err.innerHTML = '手机号格式不对';
    }
};



let textnew2=document.querySelector('.btn.btn-primary.surephone');
let oldphone=document.querySelector('.form-control.oldphone');
let newphone=document.querySelector('.form-control.newphone');
let newyzmu=document.querySelector('.form-control.yanzheng-phone1');
let newgetyzm1=document.querySelector('.btn.btn-primary.getyzm.baichi');
let telephon=sessionStorage.getItem('telephone');
let istruetwo=false;
let tt='';
//生成计时器

function jishiqi1() {
    if(! tt){
        // tt=
        newgetyzm1.innerText = scen + '秒';
        tt = setInterval(function () {
            $(newgetyzm1).attr('disabled',true);
            newgetyzm1.innerText = --scen + '秒';
            if (scen < 1) {
                clearInterval(tt);
                tt='';
                newgetyzm1.innerText = '点我获取验证码';
                $(newgetyzm1).removeAttr('disabled');
                scen = 60;
            }
        }, 1000)
    }
}

newgetyzm1.onclick=function () {
    if(oldphone.value==telephon){
        sendyzmph()
    }else{
        oldphone.value='请输入原手机号或不正确'
    }
};

function sendyzmph() {
    if (teltext.test(newphone.value) && oldphone.value==telephon) {
        $(getiyzm).removeAttr('disabled');
        let telephone_in = {
            'tel': newphone.value
        };
        $.ajax({
            url: uurl+'user/getduanxinyz/',
            type: 'get',
            data: telephone_in,
            success: function (res) {

                if(res.code=='409'){
                    clearInterval(tt);
                    istruetwo=false;
                    document.querySelector('.errshow').innerHTML = '尝试次数过多,请1个小时后重试';
                    newgetyzm1.innerText = '点我获取验证码';
                    newgetyzm1.disabled=true;
                }else if(res.code=='209'){
                        jishiqi1();
                        istruetwo=true;
                }
            },
            error: function () {
                console.log('404');
                istruetwo=false;
            },
        })
    }else{
        newphone.value='手机号格式不对'
    }
}


textnew2.onclick=function () {
    if(oldphone.value==telephon && newphone.value && newyzmu.value){
        let uu={
        'telephone':oldphone.value,
        'newtelephone':newphone.value,
        'newyzm':newyzmu.value,
    };
    $.ajax({
        url:uurl+'user/changeUserTelephone/',
        type:'post',
        data:JSON.stringify(uu),
        success:function (res) {
            if(res.code=='220'){
                document.querySelector('.errshow').innerHTML='成功';
                sessionStorage.clear();
                localStorage.clear();
                window.location.href='index2.html'
            }else if(res.code=='421'){
                document.querySelector('.errshow').innerHTML='验证码已过期 或不正确';
                newyzmu.value=''
            }
        },
        error:function () {
            console.log('404');
        }
    })
    }else{
        document.querySelector('.errshow').innerHTML='信息不完整'
    }
};
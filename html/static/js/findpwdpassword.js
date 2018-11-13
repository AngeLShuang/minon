let getyzmbtn=document.querySelector('.btn.btn-primary.getyzm');
let yzminput=document.querySelector('.form-control.yzm-txt');
let phone=document.querySelector('.form-control.user-emil.phone');
let scen=60;
let next_step=document.querySelector('.btn.nextstep');
let istrue=false;
let pp;

let tt='';
//生成计时器
function jishiqi() {
    if(! tt){
        // tt=
        getyzmbtn.innerText = scen + '秒';
        tt = setInterval(function () {
            $(getyzmbtn).attr('disabled',true);
            getyzmbtn.innerText = --scen + '秒';
            if (scen < 1) {
                clearInterval(tt);
                tt='';
                getyzmbtn.innerText = '点我获取验证码';
                $(getyzmbtn).removeAttr('disabled');
                scen = 60;
            }
        }, 1000)
    }
}

phone.oninput=function () {
  if (teltext.test(phone.value)){
      $(phone).removeClass('redborder');
      $(getyzmbtn).removeAttr('disabled');
      getyzmbtn.innerText='点我获取验证码';
      pp=phone.value;
  }
};

//获取验证码
getyzmbtn.onclick=function(){
    // jishiqi()
    // senyzm();
    isinmy()
};


function senyzm(){
    $(getyzmbtn).attr('disabled', true);
    let telephone_in = {
                'tel': phone.value
    };
    $.ajax({
            url: uurl+'user/getduanxinyz/',
            type: 'get',
            data: telephone_in,
        success: function (res) {
                if(res.code=='409'){
                    $(getyzmbtn).attr('disabled', true);
                    $(yzminput).attr('disabled', true);
                    $(phone).removeAttr('disabled');
                    clearInterval(tt);
                    // errorregisty.innerHTML = '尝试次数过多,请1个小时后重试';
                    getyzmbtn.innerText = '请一小时后尝试';
                    scen = 60;
                }else if(res.code=='209'){
                    // errorregisty.innerHTML = '';
                    $(getyzmbtn).removeAttr('disabled');
                    $(yzminput).removeAttr('disabled');
                    $(phone).removeAttr('disabled');
                    scen = 60;
                    jishiqi();
                }
            },
        error: function () {
                console.log('404');
            },
        })
};

//判断用户是否存在
function isinmy() {
    $.ajax({
                url:uurl+'user/getuser/',
                type:'get',
                data:{'tel':phone.value},
                dataType:'json',
                success:function (res) {
                    if(res.code==207){
                        document.querySelector('.please-inputphone').style.display='none';
                            $(phone).removeClass('redborder');
                            $(getyzmbtn).removeAttr('disabled');
                            senyzm();
                            jishiqi()
                            return true
                    }else
                        setTimeout(function () {
                            $(phone).addClass('redborder');
                            $(getyzmbtn).attr('disabled',true);
                            document.querySelector('.please-inputphone').innerHTML='用户不存在';
                            document.querySelector('.please-inputphone').style.display='block';
                        },100);
                        return false

                    }
        })
}

next_step.onclick=function () {
  $.ajax({
      url:uurl+'user/checkYzm/',
      type:'post',
      data:JSON.stringify({'tel':phone.value,'dx':yzminput.value}),
      success:function (res) {
          res=JSON.parse(res);
          if(res.code=='208'){
              document.querySelector('.center2').style.display='block';
              document.querySelector('.center').style.display='none'
              istrue=true;
          }else{
              console.log('验证码不正确');
              $(getyzmbtn).attr('disabled', true);
              $(yzminput).attr('disabled', true);
              istrue=false;
          }
      },
      error:function () {
          console.log('404');
          istrue=false;
      }
  })
};
let btn2=document.querySelector('.btn.nextstep2');
let pwdpwd=document.querySelector('.form-control.new-pwd');
let pwdpwd2=document.querySelector('.form-control.pwd-yes');
btn2.onclick=function () {
    if(pwdpwd.value==pwdpwd2.value && istrue){
        $.ajax({
            url:uurl+'user/Forgit/',
            type:'post',
            data:JSON.stringify({'tel':pp,'pwd':pwdpwd.value}),
            success:function (res) {
                if(res.code=='210'){
                    alert('成功');
                    sessionStorage.clear();
                    window.location.href='index2.html';
                }else{
                    alert('请刷新重试')
                }
            },
            error:function () {
                console.log('404');
            }
        })
    }
};


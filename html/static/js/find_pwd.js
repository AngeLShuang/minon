var cen1=document.querySelector('.center');
var cen2=document.querySelector('.center2');
var next1=document.querySelector('.nextstep');
var next2=document.querySelector('.nextstep2');
let flags=false;
let flag2=false;
//手机号的正则表达式
let teltext = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
//声明一个变量tel_input等于输入手机号的那个文本框
let tel_input=document.querySelector('.form-control.user-emil');
//当点击下一步的时候，进行判断，手机号和验证码是否输入
// next1.onclick=function () {
//     if(checkshuju()){
//         cen1.style.display="none";
//         cen2.style.display="block";
//     }else if (teltext.test(tel_input.value)){
//         tel_input.nextElementSibling.style.display='none';
//         getyzm.parentElement.nextElementSibling.style.display='block';

//     } else{
//         tel_input.nextElementSibling.style.display='block';
//     }
//
//
// };

//定义一个函数checkshu ju用来封装返回值
function checkshuju(){
    return flags==true && flag2==flags
}

//声明一个变量等于获取验证码的文本框
var getyzm=document.querySelector('.form-control.yzm-txt');
//onblur意思为失去焦点
getyzm.oninput=function(){
    //判断，如果文本框失去焦点时或内容为空时，显示提示信息并且判断为false
    if(getyzm.value==''){
        getyzm.parentElement.nextElementSibling.style.display='block';
        flag2=false;
    //    内容不为空时，判断为true
    }else{
        flag2=true;
    }
};


//oninput实时监控，这里的作用是监控文本框中输入的号码是否满足正则条件
tel_input.oninput=function(){
    //判断，文本框中输入的手机号是否满足teltext变量所对应的正则要求
    if(teltext.test(tel_input.value)){
        //如果满足条件，提示信息消失，判断为true
        $(getyzmbtn).removeAttr('disabled');
        tel_input.nextElementSibling.style.display='none';
        flags=true;
    }else{
        //如果不满足，提示信息会显示出来，判断为false
        tel_input.nextElementSibling.style.display='block';
        flags=false;
    }
    // document.querySelector('.form-control.yzm-txt').value=tel_input.value
};


//====================这里是修改密码====================

let flag3;
let flag4;
let flag5;

var pwdyes=document.querySelector('.form-control.pwd-yes');
let pwd_zhengze=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
next2.onclick=function () {
    if (satisfy_require()){
        var userphone = document.querySelector('.verify-userphone');
        var pwdok = document.querySelector('.pwdok-login');
        cen2.style.display = 'none';
        cen1.style.display = 'block';
        userphone.style.display = 'none';
        pwdok.style.display = 'block';
        next1.style.display = 'none';
    } else if (pwd_zhengze.test(newpwd.value)) {
        newpwd.parentElement.nextElementSibling.style.display='none';
        pwdyes.parentElement.nextElementSibling.style.display='block';

    } else{
        newpwd.parentElement.nextElementSibling.style.display='block';
    }

};


function satisfy_require() {
    return flag4==true && flag5==flag4
}

//声明一个变量等于输入新密码的文本框
var newpwd=document.querySelector('.form-control.new-pwd');


//oninput实时监控，这里的作用是监控文本框中输入的号码是否满足正则条件
newpwd.oninput=function(){
    //判断，文本框中输入的密码是否满足pwd_zhengze变量所对应的正则要求
    if(pwd_zhengze.test(newpwd.value)){
        //如果满足条件，提示信息消失，判断为true
        newpwd.parentElement.nextElementSibling.nextElementSibling.style.display='none';
        newpwd.parentElement.nextElementSibling.style.display='none';
        flag4=true;

    }else{
        //如果不满足，提示信息会显示出来，判断为false
        newpwd.parentElement.nextElementSibling.nextElementSibling.style.display='block';
        newpwd.parentElement.nextElementSibling.style.display='none';
        flag4=false;
    }
};


pwdyes.oninput=function () {
    if (pwdyes.value === newpwd.value){
        pwdyes.parentElement.nextElementSibling.style.display='none';
        flag5=true;
    } else {
        pwdyes.parentElement.nextElementSibling.style.display='block';
        newpwd.parentElement.nextElementSibling.style.display='none';
        flag5=false;
    }

};

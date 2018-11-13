let userFileImg=document.querySelector('.user-header-img');
let userFile=document.querySelector('.user-header-img .user-file');
userFileImg.onmouseover=function () {
    userFile.style.display="block";
};

userFileImg.onmouseout=function () {
    userFile.style.display="none";
};

let attention=document.querySelector('.attentiona');
let fansa=document.querySelector('.fansa');
attention.onclick=function () {
    ifa.src='./pcAttention.html';
};
fansa.onclick=function () {
    ifa.src='./pcFans.html';
};

var userinfo=null;



window.onload=function () {
    let tel=sessionStorage.getItem('userPhone');
    let token=sessionStorage.getItem('token');
    let user={
        "userPhone":tel,
        "token":token,
    };
    ajax('POST',uurl+'user/getuserinfo',user,function (result) {
        userinfo=result;
        sessionStorage.setItem("userinfo",JSON.stringify(result));
        showUserInfo();
    })
};
//展示用户信息
function showUserInfo() {
    let nicknamenav=document.querySelector('.dropdown .dropdown-toggle span');
    let userheadnav=document.querySelector('.dropdown .dropdown-toggle img');
    let userbackmain=document.querySelector('.user-header-img img');
    let nicknamemain=document.querySelector('.ange .nick');
    let atten=document.querySelector('.attentiona span');
    let fans=document.querySelector('.fansa span');
    let intro=document.querySelector('.intro');
    nicknamenav.innerHTML=userinfo["userNickname"];
    userbackmain.src=userinfo["backgroundPic"];
    userheadnav.src=userinfo["picture"];
    nicknamemain.innerHTML=userinfo["userNickname"];
    atten.innerHTML=userinfo["atten"];
    fans.innerHTML=userinfo["fans"];
    intro.innerHTML=userinfo["signature"]
}

let updatefile=document.querySelector('.user-update-file');
let headerimg=document.querySelector('.user-header-img img');
updatefile.onchange=function () {
    var file = updatefile.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        headerimg.src = e.target["result"];
    }
};
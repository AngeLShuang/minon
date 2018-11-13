//退出登录

let out=document.querySelector('.outlogin');

out.onclick=function () {
    sessionStorage.clear();
    window.location.href='index2.html'
};
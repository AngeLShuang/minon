let uuid=sessionStorage.getItem('id');
var nnns=document.querySelector('.ns');
window.onload = function () {
    let flag = sessionStorage.getItem('flag');
    let token = sessionStorage.getItem('token');
    let id = sessionStorage.getItem('id');
    let user=JSON.parse(sessionStorage.getItem('user'));
    if (flag && token && id) {
        let xinxi=document.querySelector('.dropdown');
        xinxi.style.display='block';
        xinxi.nextElementSibling.style.display="none";
        xinxi.children[0].children[1].src=user[0]["headportraitid__picture"];
        xinxi.children[0].children[0].innerHTML=user[0]["usernickname"]
    }
    document.querySelector('.personnal').onclick=function () {
        sessionStorage.setItem('yoursid','');
        window.location.href='personalCenter.html'
    };
    document.querySelector('.dongtai').onclick=function () {
        sessionStorage.setItem('condition','');
        location.href='dynamic.html'
    };
    document.querySelector('.publishDynamic').onclick=function () {
        sessionStorage.setItem('dyid','');
        location.href='publishDynamic.html'
    };
    document.querySelector('.cookbookfabu').onclick=function () {
        sessionStorage.setItem('bianji','');
        location.href='cookBook.html'
    }
};
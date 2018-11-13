let perlist=document.querySelector('.perlist');
let ifa=document.querySelector('.embed-responsive-item');
perlist.onclick=function (event) {
    if(event.target.id){
        ifa.src=event.target.id;
    }
};


//=============这里是审核信息的页面跳转=================
let myaudit=document.querySelector('.myAudit');
let mynotaudit=document.querySelector('.mynotAudit');
let auditpass=document.querySelector('.AuditPass');
let auditnot=document.querySelector('.Auditnot');


// 这里是我审核别人的
myaudit.onclick=function () {
    ifa.src='./passAudit.html';
};
mynotaudit.onclick=function () {
    ifa.src='./not_passAudit.html';
};

//这里是别人审核我的
auditpass.onclick=function () {
    ifa.src='./my_passAudit.html';
};
auditnot.onclick=function () {
    ifa.src='./mynot_Audit.html'
};

let user=JSON.parse(sessionStorage.getItem('user'));
let headpic=document.querySelector('.user-headPic img');
let nickname=document.querySelector('.nick');
headpic.src=user[0]["headportraitid__picture"];
nickname.innerHTML=user[0]["usernickname"];


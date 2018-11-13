window.onload=function () {
    getBroadcast();
};
var all_pic=null;
var result_pic=null;


//得到展示的图片
function getBroadcast(){
    ajax('GET',uurl+'cookbook/showbeautpic',{},function (result) {
        if (result) {
            all_pic = result;
            result_pic = all_pic;
            let start = 0;
            let end = 3;
            showBroadcast(start, end)
        }else{
            console.log('出错了')
        }
    })
}


var carouse=document.querySelector('.carousel-indicators');
var inner=document.querySelector('.carousel-inner');
//展示图片
function showBroadcast(start,end) {
    for(let i=start;i<=end;i++){
        var picture=result_pic[i];
        carouse.innerHTML+=`
            <li data-target="#carousel-example-generic" data-slide-to="${i+1}"></li>
        `;
        inner.innerHTML+=`
            <div class="item">
                <img src="${picture.cookbookPictures}" alt="${picture.cookbookName}" class="imgslide">
                <div class="carousel-caption">
                    ${picture.cookbookName}
                </div>
            </div>
        `
    }
}

//登录
login();
function login() {
    let logbtn=document.querySelector('#login');
    logbtn.onclick=function () {
        var tel=document.querySelector('#inputTel3');
        var pwd=document.querySelector('#inputPassword3');
        var autoLogin=document.querySelector('.autoLogin');
        var errortest=document.querySelector('.error');
        var telephone=tel.value;
        var password=pwd.value;
        var teltest=/^[0-9]{11}$/;
        var pwdtest=/^.+$/;
        var telres=teltest.test(telephone);
        var pwdres=pwdtest.test(password);
        if(telres==false){
            tel.value='';
            errortest.innerText='用户名格式不正确,请重新输入';
            tel.focus();
        }else if(pwdres==false){
            pwd.value='';
            errortest.innerText='密码格式不正确,请重新输入';
            pwd.focus();
        }else {
            var data=new Date();
            var fulldata=data.toJSON().toString().substr(0,10);
            var user={
                "userPhone":tel.value,
                "userPassword":pwd.value,
                "userNewLoginTime":fulldata
            };
            ajax('POST',uurl+'login',user,function (result) {
                if(result && result.statecode=='201'){
                    sessionStorage.setItem('token',result.token);
                    sessionStorage.setItem('userPhone',user.userPhone);
                    if(autoLogin.checked){
                        sessionStorage.setItem('userPassword',user.userPassword);
                    }
                    var from=sessionStorage.getItem('from');
                    if(from){
                        location.href=from;
                    }else{
                        location.href='./personalCenter.html'
                    }
                }else {
                    errortest.innerText='用户名或密码错误';
                    tel.focus();
                }
            })
        }
    };
}


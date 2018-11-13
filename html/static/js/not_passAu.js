//===========这里是分页=============
var pagesize = 2;
var pagecount = 0;   //当前页
var pageindex = 1;
// window.onload 页面加载完成之后会执行该方法
window.onload = function () {
    getweishenhedata();
    showPage()
};

var weishenhedata = [];
let userid = sessionStorage.getItem('id');

function getweishenhedata() {
    let data = {
        "userid": userid
    };
    $.ajax({
        url: uurl+'user/getWeiShenheOther/',
        type: 'post',
        data: JSON.stringify(data),
        success: function (res) {
            res = JSON.parse(res);
            weishenhedata = res;
            pageindex = 1;
            showweishenhedata((pageindex - 1) * pagesize, pageindex * pagesize);
        }
    })
}

function showweishenhedata(begin, end) {
    for (let i = begin; i < end; i++) {
        let shen = weishenhedata[i];
        con.innerHTML += `
            <div class="row weishenhe">
                <div class="user-revise-info" id="${shen.cookbookId}">
                    <a title="${shen.cookbookName}" >
                    <img src="${shen.cookbookPictures}" alt="${shen.cookbookName}" class="img-pass">
                    </a>
                    <a  class="food-name">${shen.cookbookName}</a>
                </div>

                <div class="clicklook-box">
                    <button class="btn  btn-lg clicklook" name="${shen.shenqingrenId}">
                        前往审核
                    </button>
                </div>
            </div>
        `
    }
}

var linka = document.querySelector('.linka');
let pages = document.querySelector('.pages');
let firstpage = document.querySelector('.first');
let endpage = document.querySelector('.end');

let con = document.querySelector('.con');
con.onclick = function (event) {
    let eve = event.target;
    if (eve.nodeName == 'BUTTON' && eve.className == 'btn  btn-lg clicklook') {
        let thisid = eve.name;
        let thiscookbookid = eve.parentElement.previousElementSibling.id;
        let che = {
            "userid": thisid,
            "cookbookid": thiscookbookid,
        };
        $.ajax({
            url: uurl+'user/getDetailedChe/',
            type: 'post',
            data: JSON.stringify(che),
            success: function (res) {
                res = JSON.parse(res);
                let weishenhedetailinfo = res;
                showweidetail(weishenhedetailinfo);
            }
        })
        $('#myModal').modal('toggle');
    }else if (eve.className == 'food-name') {
        sessionStorage.setItem('nowfood',eve.parentElement.id);
        sessionStorage.setItem('heuserphone',sessionStorage.getItem('id'));
        parent.window.location.href = "xiangqing.html";
    } else if (eve.className == 'img-pass') {
        sessionStorage.setItem('nowfood',eve.parentElement.parentElement.id);
        sessionStorage.setItem('heuserphone',sessionStorage.getItem('id'));
        parent.window.location.href = "xiangqing.html";
    }
};


let details = document.querySelector('.details-box2');

function showweidetail(weishenhedetailinfo) {
    let touxinxi = document.querySelector('.touxinxi');
    details.innerHTML = '';
    touxinxi.innerHTML = `
        <div class="details-box1">
            <span class="applicant">申请人</span>
            <a href="other_personalCenter.html" title="${weishenhedetailinfo[0]["usernickname"]}">
            <img src="${weishenhedetailinfo[0]["userheadpic"]}" alt="${weishenhedetailinfo[0]["usernickname"]}">
            </a>
            <a href="other_personalCenter.html" class="food-name">${weishenhedetailinfo[0]["usernickname"]}</a>
        </div>
    `
    for (let s of weishenhedetailinfo) {
        if (s["isallow"] == '2') {
            details.innerHTML += `
                <div class="row">
                    <h4 class="fangehei"><img src="../static/image/我的订单.svg" alt="">原步骤：</h4>
                       <p>${s["yuancontent"]}</p>
                        <div class="apply" id="${s["stepid"]}">
                             <h4 class="fangehei"><img src="../static/image/修改-default.svg" alt="">申请替换为</h4>
                             <div class="yes-no" id="${s["checkid"]}">
                                 <button type="button" class="btn btn-success yes-btn">同意</button>
                                 <button type="button" class="btn btn-info no-btn">不同意</button>
                             </div>
                             <a class="yitongguo-1">已通过</a>
                             <a class="yitongguo-2">未通过</a>
                        </div>

                        <p>${s["shenqingcontent"]}</p>
                        <h5 class="fangehei">附图：<img src="${s["picture"]}"  class="img-responsive center-block" alt=""></h5>
                </div>
            `
        }
    }
    let shijian=document.querySelector('.details-box3 div p:nth-child(2)');
    shijian.innerHTML=`${weishenhedetailinfo[0]["updatetime"]}`

}

linka.onclick = function (event) {
    let index = event.target.innerHTML;
    if (index == pagecount) {
        firstpage.style.opacity = '1';
        endpage.style.opacity = '0';
    } else if (index == 1) {
        firstpage.style.opacity = '0';
        endpage.style.opacity = '1';
    }
    pageindex = index;
};

firstpage.onclick = function () {
    pageindex = parseInt(pageindex) - 1;
    if (pageindex == 1) {
        firstpage.style.opacity = '0';
        endpage.style.opacity = '1';
    }
};

endpage.onclick = function () {
    pageindex = parseInt(pageindex) + 1;
    if (pageindex == pagecount) {
        firstpage.style.opacity = '1';
        endpage.style.opacity = '0';
    }
};

var cball = document.querySelectorAll('.con>div');

function showPage() {
    linka.innerHTML = '';
    pagecount = Math.ceil(cball.length / pagesize);
    if (pagecount == 1 || pagecount == 0) {
        pages.style.opacity = '0';
    } else {
        pages.style.opacity = '1';
        if (pageindex == pagecount) {
            firstpage.style.opacity = '1';
            endpage.style.opacity = '0';
        } else if (pageindex == 1) {
            firstpage.style.opacity = '0';
            endpage.style.opacity = '1';
        }
        for (let i = 1; i <= pagecount; i++) {
            linka.innerHTML += `
            <a href="#">${i}</a>
            `
        }
    }
}

details.onclick=function (event) {
    let eve = event.target;
    if (eve.nodeName == 'BUTTON' && eve.className == 'btn btn-success yes-btn') {
        let tongyi={
            "content":eve.parentElement.parentElement.nextElementSibling.innerHTML,
            "pic":eve.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].src,
            "stepid":eve.parentElement.parentElement.id,
            "checkid":eve.parentElement.id,
        };
        addtongyi(tongyi);
        event.target.style.display = 'none';
        event.target.nextElementSibling.style.display = 'none';
        event.target.parentElement.nextElementSibling.style.display = 'block';
        event.target.parentElement.nextElementSibling.nextElementSibling.style.display = 'none';
    }else if (eve.nodeName == 'BUTTON' && eve.className == 'btn btn-info no-btn') {
        let tongyi={
            "checkid":eve.parentElement.id,
        };
        butongyi(tongyi)
        event.target.style.display = 'none';
        event.target.previousElementSibling.style.display = 'none';
        event.target.parentElement.nextElementSibling.style.display = 'none';
        event.target.parentElement.nextElementSibling.nextElementSibling.style.display = 'block';
    }
};

function butongyi(tongyi) {
    $.ajax({
            url: uurl+'user/notagreeUpdateStep/',
            type: 'get',
            data: tongyi,
            success: function (res) {
                console.log('chenggong')
            }
        })
}

function addtongyi(tongyi) {
    $.ajax({
            url: uurl+'user/agreeUpdateStep/',
            type: 'get',
            data: tongyi,
            success: function (res) {
                console.log('chenggong')
            }
        })
}



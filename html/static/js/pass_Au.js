var pagesize = 2;
var pagecount = 0;   //当前页
var pageindex = 1;
var shenhedata = [];
let userid = sessionStorage.getItem('id');

window.onload = function () {
    getshenhedata();
    showPage()
};
let name = document.querySelector('.food-name');
let con = document.querySelector('.con');
con.onclick = function (event) {
    let eve = event.target;
    if (eve.nodeName == 'A' && eve.className == 'btn btn-lg clicklook') {
        let thisid = eve.previousElementSibling.children[0].id;
        let thiscookbookid = eve.previousElementSibling.children[0].children[0].name;
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
                let shenhedetailinfo = res;
                showdetail(shenhedetailinfo);
            }
        })
        $('#myModal').modal('toggle');
    } else if (event.target.className == 'food-name') {
        sessionStorage.setItem('nowfood',event.target.previousElementSibling.children[0].name);
        sessionStorage.setItem('heuserphone',sessionStorage.getItem('id'));
        parent.window.location.href = "xiangqing.html";
    } else if (event.target.className == 'img-pass') {
        sessionStorage.setItem('nowfood',event.target.name);
        sessionStorage.setItem('heuserphone',sessionStorage.getItem('id'));
        parent.window.location.href = "xiangqing.html";
    }
};

//展示审核详细信息
function showdetail(shenhedetailinfo) {
    let touxinxi = document.querySelector('.touxinxi');
    let details = document.querySelector('.details-box2');
    details.innerHTML='';
    touxinxi.innerHTML = `
        <div class="details-box1">
            <span class="applicant">申请人</span>
            <a href="####" title="${shenhedetailinfo[0]["usernickname"]}">
            <img src="${shenhedetailinfo[0]["userheadpic"]}" alt="${shenhedetailinfo[0]["usernickname"]}">
            </a>
            <a href="####" class="food-name">${shenhedetailinfo[0]["usernickname"]}</a>
        </div>
    `
    for (let s of shenhedetailinfo) {
        if (s["isallow"] == '1') {
            details.innerHTML += `
                <div class="row">
                    <h4 class="fangehei"><img src="../static/image/我的订单.svg" alt="">已通过步骤：</h4>
                    <p>${s["yuancontent"]}</p>
                    <h5 class="fangehei">附图：<img src="${s["picture"]}" class="img-responsive center-block" alt="${s["yuancontent"]}"></h5>
                </div>
            `
        } else {
            details.innerHTML +=`
                <div class="row">
                    <h4 class="fangehei"><img src="../static/image/我的订单.svg" alt="">原步骤：</h4>
                    <p>${s["yuancontent"]}</p>
                    <div class="apply">
                        <h4 class="fangehei"><img src="../static/image/修改-default.svg" alt="">申请替换为</h4>
                        <a class="yitongguo">未通过</a>
                    </div>

                    <p>${s["shenqingcontent"]}</p>
                    <h5 class="fangehei">附图：<img src="${s["picture"]}" class="img-responsive center-block" alt="${s["shenqingcontent"]}"></h5>
                </div>
            `
        }
    }
    let shijian=document.querySelector('.details-box3 div p:nth-child(2)');
    shijian.innerHTML=`${shenhedetailinfo[0]["updatetime"]}`
}

function getshenhedata() {
    let data = {
        "userid": userid
    };
    $.ajax({
        url: uurl+'user/getYiShenheOther/',
        type: 'post',
        data: JSON.stringify(data),
        success: function (res) {
            res = JSON.parse(res);
            shenhedata = res;
            pageindex = 1;
            showshenhedata((pageindex - 1) * pagesize, pageindex * pagesize);
        }
    })
}

//展示数据
function showshenhedata(begin, end) {
    for (let i = begin; i <= end; i++) {
        let shen = shenhedata[i];
        con.innerHTML += `
            <div class="row yishenhe">
            <div class="user-revise-info">
                    <a  id="${shen.shenqingrenId}" >
                    <img src="${shen['cookbookPictures']}" name="${shen.cookbookId}" alt="" class="img-pass">
                    </a>
                    <a  class="food-name">${shen["cookbookName"]}</a>
            </div>
            <a class="btn btn-lg clicklook" >点击查看详情</a>
            <div class="yishenhe-btn">
                <form>
                <fieldset disabled>
                     <button type="submit" class="btn btn-primary ">已审核</button>
                </fieldset>
                </form>
            </div>
        </div>
        `
    }
}


var linka = document.querySelector('.linka');
let pages = document.querySelector('.pages');
let firstpage = document.querySelector('.first');
let endpage = document.querySelector('.end');

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
    showshenhedata((pageindex - 1) * pagesize, pageindex * pagesize)
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
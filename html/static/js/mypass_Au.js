var pagesize = 10;
var pagecount = 0;   //当前页
var pageindex = 1;
window.onload=function (){
    getselfcbdata();
    getpagecount();
};

function getpagecount() {
    let want={
        "userid":sessionStorage.getItem('id')
    };
    $.ajax({
        url:uurl+'cookbook/getcbPagecount/',
        type:'post',
        data:JSON.stringify(want),
        success:function (res) {
           pagecount=Math.ceil(JSON.parse(res)/pagesize);
           let gong=document.querySelector('.gong');
           gong.innerHTML=pagecount;
           showPage()
        },
        error:function () {
            console.log('404');
        }
   })
}

//暂时:获得自己发布菜谱通过审核的
function getselfcbdata() {
    let wantget={
        "index":pageindex,
        "num":pagesize,
        "userid":sessionStorage.getItem('id')
    };
    $.ajax({
        url:uurl+'cookbook/getfoodByPhone/',
        type:'post',
        data:JSON.stringify(wantget),
        success:function (res) {
           shuju=JSON.parse(res);
           showselfcbdata()
        },
        error:function () {
            console.log('404');
        }
   })
}

var skip = document.querySelector('.con');

//暂时:展示自己发布菜谱通过审核的
function showselfcbdata() {
    skip.innerHTML=``
    for(let i of shuju){
        skip.innerHTML+=`
        <div class="row yishenhe">
            <div class="user-revise-info">
                    <a  title="菜谱图片" name="${i["baseid"]}">
                    <img src="${i["totalpictures"]}" alt="${i["baseid__cookbookname"]}" class="img-pass">
                    </a>
                    <a  class="food-name">${i["baseid__cookbookname"]}</a>
            </div>
            <div class="yishenhe-btn">
                <form>
                <fieldset disabled>
                     <button type="submit" class="btn btn-primary ">已被审核通过</button>
                </fieldset>
                </form>
            </div>
        </div>
    `
    }
}

let pages = document.querySelector('.pages');
let firstpage = document.querySelector('.first');
let endpage = document.querySelector('.end');
let tiao=document.querySelector('.tiao');
let tiaozhuanbtn=document.querySelector('.tiao button');
let tishi=document.querySelector('.tishi');

tiaozhuanbtn.onclick=function (){
    let tiaozhuannum=document.querySelector('.tiao input').value;
    if(tiaozhuannum){
        pageindex= parseInt(tiaozhuannum);
        getselfcbdata();
        showPage()
    }else {
        tishi.innerHTML='请输入您要跳转的页码'
    }
};

firstpage.onclick = function () {
    pageindex = parseInt(pageindex) - 1;
    if (pageindex == 1) {
        firstpage.style.opacity = '0';
        endpage.style.opacity = '1';
    }else if(pageindex >= 1){
        getselfcbdata();
        showPage()
    }
};

endpage.onclick = function () {
    pageindex = parseInt(pageindex) + 1;
    if (pageindex == pagecount) {
        firstpage.style.opacity = '1';
        endpage.style.opacity = '0';
    }else if(pageindex <= pagecount){
        getselfcbdata();
        showPage()
    }
};
//展示页码
function showPage(){
    if(pagecount==1||pagecount==0){
        pages.style.opacity='0';
        tiao.style.opacity='0';
    }else{
        pages.style.opacity='1';
        tiao.style.opacity='1';
        if(pageindex==pagecount){
            firstpage.style.opacity='1';
            endpage.style.opacity='0';
        }else if(pageindex==1){
            firstpage.style.opacity='0';
            endpage.style.opacity='1';
        }else{
            firstpage.style.opacity='1';
            endpage.style.opacity='1';
        }
    }
}

skip.onclick = function (event) {
    if (event.target.className == 'food-name') {
        sessionStorage.setItem("nowfood",event.target.previousElementSibling.name);
        sessionStorage.setItem("heuserphone",sessionStorage.getItem('id'));
        parent.window.location.href = "xiangqing.html";
    } else if (event.target.className == 'img-pass') {
        sessionStorage.setItem("heuserphone",sessionStorage.getItem('id'));
        sessionStorage.setItem("nowfood",event.target.parentElement.name);
        parent.window.location.href = "xiangqing.html";
    }

};
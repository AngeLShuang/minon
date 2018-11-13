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
        url:uurl+'cookbook/getnotcbPagecount/',
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
        url:uurl+'cookbook/getnotfoodByPhone/',
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
        if(i["admincheck"]==2){
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
                     <button type="submit" class="btn btn-primary ">待审核</button>
                </fieldset>
                </form>
            </div>
        </div>
    `
        }else if(i["admincheck"]==0){
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
                     <button type="submit" class="btn btn-primary ">未通过</button>
                </fieldset>
                </form>
            </div>
            <div class="yishenhe-btn">
                <form>
                <a class="deletethis">删除</a>
                </form>
            </div>
            <div class="yishenhe-btn">
                <form>
                <a class="updatethis">修改</a>
                </form>
            </div>
        </div>
    `
        }
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
    let eve=event.target;
    if (event.target.className == 'food-name') {
        sessionStorage.setItem("nowfood",event.target.previousElementSibling.name);
        sessionStorage.setItem("heuserphone",sessionStorage.getItem('id'));
        // parent.window.location.href = "xiangqing.html";
    } else if (event.target.className == 'img-pass') {
        sessionStorage.setItem("heuserphone",sessionStorage.getItem('id'));
        sessionStorage.setItem("nowfood",event.target.parentElement.name);
        // parent.window.location.href = "xiangqing.html";
    }else if(eve.className=='deletethis'){
        swal({
          title: '确定删除吗？',
          text: '你将无法恢复它！',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定删除！',
        }).then(function(){
          swal(
            '删除！',
            '你的文件已经被删除。',
            'success'
            );
        })
    }else if(eve.className=='updatethis'){
    }

};
//关注按钮点击事件
attBtn();
function attBtn() {
    let attPeople=document.querySelector('.attPeople');
    attPeople.onclick=function (event) {

        eve=event.target;
        if(eve.className=='bordertuo attBtn' && eve.innerHTML=='已关注'){
            eve.innerHTML='关注';
            eve.style.backgroundColor='#ffc0b4';
            eve.style.color='white';
        }else if(eve.className=='bordertuo attBtn' && eve.innerHTML=='关注'){
            eve.innerHTML='已关注';
            eve.style.backgroundColor='white';
            eve.style.color='#ffc0b4';
        }
    }
}
var attone=document.querySelectorAll('.attone');
var resultPosition=attone;    //存储当前的关注人

var pagesize=4;
var pagecount=0;   //当前页
var pageindex=1;
window.onload=function (){
    showPage()
};

var linka=document.querySelector('.linka');
let pages=document.querySelector('.pages');
let firstpage=document.querySelector('.first');
let endpage=document.querySelector('.end');

linka.onclick=function (event){
    let index=event.target.innerHTML;
    if(index==pagecount){
        firstpage.style.opacity='1';
        endpage.style.opacity='0';
    }else if(index==1){
        firstpage.style.opacity='0';
        endpage.style.opacity='1';
    }
    pageindex=index;
};

firstpage.onclick=function () {
    pageindex=parseInt(pageindex)-1;
    if(pageindex==1){
        firstpage.style.opacity='0';
        endpage.style.opacity='1';
    }
};

endpage.onclick=function () {
    pageindex=parseInt(pageindex)+1;
    if(pageindex==pagecount){
        firstpage.style.opacity='1';
        endpage.style.opacity='0';
    }
};

function showPage(){
    linka.innerHTML='';
    pagecount=Math.ceil(attone.length/pagesize);
    if(pagecount==1||pagecount==0){
        pages.style.opacity='0';
    }else{
        pages.style.opacity='1';
        if(pageindex==pagecount){
            firstpage.style.opacity='1';
            endpage.style.opacity='0';
        }else if(pageindex==1){
            firstpage.style.opacity='0';
            endpage.style.opacity='1';
        }
        for(let i=1;i<=pagecount;i++){
            linka.innerHTML+=`
            <a href="#">${i}</a>
            `
        }
    }
}
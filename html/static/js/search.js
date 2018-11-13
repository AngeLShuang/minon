var highsearch=document.querySelector('.highsearch');
highsearch.onclick=function (event) {
    let eve=event.target;

    if(eve.nodeName=='SPAN' && eve.getAttribute('class')=='getmore'){
        if(eve.parentElement.previousElementSibling.style.height=='auto'){
            eve.parentElement.previousElementSibling.style.height='40px';
        }else if(eve.parentElement.previousElementSibling.style.height=='40px'){
            eve.parentElement.previousElementSibling.style.height='auto';
        }
    }
}

$('.zhankai').click(function () {
    $('.highsearch').slideToggle();
});

var jieguo=document.querySelector('.jieguo');
jieguo.onclick=function (event) {
    let eve=event.target;
    if(eve.nodeName=='A') {
        let jiao=document.querySelectorAll('.jiaonang li');
        for(let i of jiao){
            $(i).removeClass('active');
        }
        $(eve.parentElement).addClass('active');

    }
};



var h = 0;
var o = 0;

function show(infoc) {
    let ldis = infoc.style.left;
    let distance = parseInt(ldis.split('px')[0]);
    if (distance > 0) {
        h += 0.03;
        o += 0.08;
        leng = distance - h;
        infoc.style.left = leng + "px";
        infoc.style.opacity = o;
    } else {
        h=0;
        o=0;
        clearInterval(leter);
    }
}

function hide(infoc) {
    let ldis = infoc.style.left;
    let distance = parseInt(ldis.split('px')[0]);
    o=1;
    if (distance <= 232) {
        h += 0.6;
        o =o- 0.08;
        infoc.style.left = h + "px";
        infoc.style.opacity = o;
    } else {
        h=0;
        o=0;
        clearInterval(leter);
    }
}


var imgall = document.querySelectorAll('.info');
var leter;
for(let img of imgall){
    img.onmouseover = function () {
        var infoc=img.children[1];
        let ldis = infoc.style.left;
        let distance = parseInt(ldis.split('px')[0]);
        clearInterval(leter);
        if(distance>0){
            leter = setInterval(function () {
                show(infoc);
            }, 5);
        }
    };

    img.onmouseleave=function () {
        var infoc=img.children[1];
        let ldis = infoc.style.left;
        let distance = parseInt(ldis.split('px')[0]);
        clearInterval(leter);
        if(distance<=232){
            leter = setInterval(function () {
                hide(infoc);
            }, 5);
        }
    }
}

var cball=document.querySelectorAll('.cbl');
var resultPosition=cball;    //存储当前的关注人

var pagesize=2;
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
    pagecount=Math.ceil(cball.length/pagesize);
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



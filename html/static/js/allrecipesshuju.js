let all_shuju=[];
let snack_list=document.querySelector('.snack_list');
let index=1;
let pagesizes=6;   // 一页显示的个数
let pagelen;       //
let start,end;
let yemalist=document.querySelector('.pager.fy .linka ul');   // 上一页 下一页
let yemalistclick=document.querySelector('.pager.fy');
let alllia;
let jishu=1;
let saixuanshuju={
    'kw':'',
    'jishu':jishu
};
ajaxgetshuju();


//获得数据
function ajaxgetshuju() {
    $.ajax({
        url:uurl+'cookbook/getckAllMessage/',
        type:'get',
        data:saixuanshuju,
        success:function (res) {

            for(let i of JSON.parse(res)){
                all_shuju.push(i);
            }
            pagelen=Math.ceil(all_shuju.length/pagesizes);
            showyema();
            getindex(index);
        },
        error:function () {
            console.log('777');
            console.log('404');
        },
    })
}

function showshuju(start,end){
    snack_list.innerHTML=``;
    let mes;
    for(let i=start;i<end;i++){
        mes=all_shuju[i];
        snack_list.innerHTML+=`
            <div class="cbl" id="${mes.baseId}">
                <div class="img">
                    <a  class="img"><img alt="${mes.cookbookName}" src="${mes.totalPictures}"></a>
                    <strong class="gx"><span>${mes.efficacyone}</span></strong>
                </div>
                <div class="info">
                    <a class="img"></a>
                    <div class="infoc" >
                        <a  class="linkcb">
                            <ul>
                                <li class="gy">${mes.belongTo}</li>
                                <li class="kw">${mes.tasteLabel}</li>
                                <li class="nd">${mes.styleName}</li>
                            </ul>
                        </a>
                        <div class="gx2">
                            <span>${mes.efficacy}</span>
                        </div>
                    </div>
                </div>
                <div class="infoma">
                    <h3>
                        <a>
                            ${mes.cookbookName}
                        </a>
                    </h3>
                    <div class="usermessage" name="${mes.userPhone}">
                        <div class="d1">
                            <span>${mes.cllect}收藏</span>
                            <span>${mes.browl}浏览</span>
                        </div>
                        <a class="author">
                            ${mes.userNickname}
                        </a></div>
                </div>
            </div>
        `
    }
}

function getindex(index) {
    start=(index-1)*pagesizes;
    end=index*pagesizes>all_shuju.length?all_shuju.length:index*pagesizes;
    showshuju(start,end)
}

function showyema() {
    yemalist.innerHTML=``;
    let mm=index+1>pagelen?index-2:index+2>pagelen?index-1:index;
    for(let i=1;i<=3;i++){
        if(mm>=1){
            yemalist.innerHTML+=`
            <li><a href="#">${mm}</a></li> 
        `
        }
        mm++;
    }
    alllia=document.querySelectorAll('.pager.fy .linka ul li a');
}

yemalistclick.onclick=function (event) {
    if(event.target.nodeName=='A'){
      if(event.target.className=='first'){
          if(index>1){
              index--;
          }
      }else if(event.target.className=='end'){
          if(index<pagelen){
            index++;
          }
      }else{
              index=parseInt(event.target.innerText);
          }
      }

    if(index*pagesizes+11>all_shuju.length){
      saixuanshuju.jishu++;
    ajaxgetshuju()
  }

    getindex(index);
    showyema();
};

let jj=document.querySelector('.cbfood');
jj.onclick=function (event) {


    if(event.target.className.slice(0,1)=='k'){
        all_shuju=[];
        saixuanshuju.kw=event.target.innerText.toString().slice(0,event.target.innerText.length-1);
      ajaxgetshuju();
      index=1;
  }
};


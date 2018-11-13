let content=document.querySelector('.content');
let nowfood=sessionStorage.getItem('nowfood');
let heuserphone=sessionStorage.getItem('heuserphone');
let myid=sessionStorage.getItem('id');
let shuju,s_b;
let wantget;
let sct_f;
let zhu=document.querySelector('.zhuliao-div .zhuliao');
let fu=document.querySelector('.fuliao-div .fuliao');
let jianjie=document.querySelector('.jianjie-main');
let collectbtn=document.querySelector('.collect .c');
let stepcontent=document.querySelector('.buzouzong');

$.ready(
    wantget={
        'nowfood':nowfood
    },
    $.ajax({
        url:uurl+'cookbook/getfoodMessage/',
        type:'get',
        data:wantget,
        success:function (res) {
           shuju=res;
            showjianjie();
            checkcollect();
            shoujieshao();
            getshicai();
        },
        error:function () {
            console.log('404');
        }
   }),

);
//基本信息
function showjianjie() {
    document.querySelector('.jianjie-img img').src=shuju.totalpictures;
    document.querySelector('.caipu-name').innerText=shuju.baseid__cookbookname.slice(0,6);
    jianjie.innerHTML=`
        <ul>
                            <li>
                                地区
                                <div>
                                    ${shuju.styleid__stylename}
                                </div>
                            </li>
                            <li>
                                工艺
                                <div>
                                    ${shuju.baseid__belongto}
                                </div>
                            </li>
                            <li>
                                口味
                                <div>
                                    ${shuju.tasteid__tastelabel}
                                </div>
                            </li>
                        </ul>
    `
}

//介绍
function shoujieshao() {
    document.querySelector('.materials p').innerText=`${shuju.detailintroduce}`;
}
//发ajax请求食材
function getshicai() {
    $.ajax({
        url:uurl+'cookbook/getsgicaibuzou/',
        type:'get',
        data:wantget,
        success:function (resu) {
            s_b=resu;
            showshicaibuzou()
        },
        error:function () {
            console.log('404');
        }
   })
}

//渲染食材步骤
function showshicaibuzou() {
    zhu.innerHTML=``;
    fu.innerHTML=``;
    stepcontent.innerHTML='';
    for(let j of s_b['zhu']){
        if(j.trim()){
            zhu.innerHTML+=`
                    <li>
                        <span class="xinxi">
                             <span>
                                  <a class="zhuliaoone">${j}</a>
                            </span>
                        </span>
                    </li>
    `;
        }
    };
    for(let k of s_b['fu']){
        if(k.trim()){
            fu.innerHTML+=`
            <li>
                <span style="font-size: 14px;margin-left: 20px">${k}</span>
             </li>
            `;
        };
    };
    let num=1;
    document.querySelector('.buzhou-top span').innerHTML=shuju['baseid__cookbookname']+'的做法';
    for(let st of s_b['buzou']){
        stepcontent.innerHTML+=`
        <div class="buzhou-content" id="${st.id}">
                            <span>${num}</span>
                        <div>
                            <p>${st.stepcontent}</p>
                            <div class="xianshix">显示详情</div>
                            <div class="img-buzhou">
                                <img src="${st.picturesrc}" alt="">
                            </div>
                        </div>
                            <div class="mythink">
                                    我的想法
                                </div>
                                <div class="motaixiugai">
                                <div class="inner">
                                    <textarea name="" cols="30" rows="5" placeholder="请输入步骤"></textarea>
                                    <div >
                                        <div class="bimg">
                                            <input type="file" class="upimg">
                                            <img src="https://s1.st.meishij.net/rs/44/110/4152544/n4152544_153259805303350.jpg" alt="上传图片">
                                        </div>
                                        <div class="btndiv">
                                            <button class="btnup">
                                                确定
                                            </button>
                                            <button class="xsbtn">
                                                取消
                                            </button>
                                        </div>
                                        <div class="result">
                                            <h4>我们已录入您的想法，我们会认真仔细审核您的想法，当审核人员 审核通过后会显示到页面，感谢您的参与</h4>
                                            <div class="result-inner">
                                                <button class="resbtn">
                                                    我知道了
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                `;
        num++;
    }


}

//主料点击事件
zhu.onclick=function (event) {
    let eve=event.target;
    if(eve.nodeName=='A' && eve.className=='zhuliaoone'){
        sessionStorage.setItem('food_name',eve.innerHTML.substring(0,2));
        location.href='shicainew.html'
    }
}

//判断收藏人数以及用户有没有已收藏
function checkcollect() {
    document.querySelector('.caipu-collect .collect .n').innerHTML=shuju['collected'].length;
    for(let i of shuju['collected']){
        if(myid){
            if(i['userphone'].toString()==myid.toString()){
            collectbtn.innerHTML='已收藏';
            collectbtn.parentElement.style.background='rgba(151, 193, 208, 0.71)'
            sct_f=true;
            break
            }else{
                collectbtn.innerHTML='收藏';
                sct_f=false;
            }

        }
    }
}

let ns=document.querySelector('.ns');
$.ajax({
   url:uurl+'cookbook/getshenhe/',
   type:'get',
   data:{'userphone':myid},
   success:function (res) {
        ns.innerHTML='';
       res=JSON.parse(res);
       if(res.count){
           ns.innerHTML=res.count
       }


   },
    error:function () {
        console.log('404');
    }
});
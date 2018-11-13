let indexi = 1;
let pagesize = 6;   // 一页显示的个数
let yemalistt = document.querySelector('.pager.fy .linka ul');   // 上一页 下一页
let yemalisttclick = document.querySelector('.pager.fy');
let allliaa;
let conditions='';
let pagelend;
let bb = document.querySelector("#bb");
//
//
//
//
//
//
//
// // $(function () {
// //     ajaxgetshuju()
// // });
//
// //获得全部数据
// let all_shujuchoose = [];
// let linshi = [];
// let pagelenc;
// let jishuu = 1;
// function ajaxgetshuju() {
//     $.ajax({
//         url: 'http://127.0.0.1:8000/cookbook/getckBaseMessage/',
//         type: 'get',
//         data: {'jishu': jishuu},
//         success: function (res) {
//             // console.log(res);
//             // console.log(res["intro"]);
//             res = JSON.parse(res);
//             for (let i of res) {
//                 all_shujuchoose.push(i);
//                 linshi = all_shujuchoose;
//                 pagelend=Math.ceil(linshi.length/6)
//             }
//
//             // console.log(linshi);
//             pagelenc = Math.ceil(linshi.length / pagesize);
//             showyema();
//             getindex(indexi);
//             // console.log(res);
//         },
//         error: function () {
//             console.log('404');
//         },
//     })
// }
//
// //渲染全部数据
// let startt, endd;
// let snack_lists = document.querySelector('.snack_list');
// // function showshuju(startt, endd) {
// //     snack_lists.innerHTML = ``;
// //     let mes;
// //     for (let i = startt; i < endd; i++) {
// //         mes = linshi[i];
// //         // console.log(mes);
// //         snack_lists.innerHTML += `
// //             <div class="cbl" id="${mes.id}">
// //                 <div class="img">
// //                     <a  class="img"><img alt="${mes.cookbookname}" src="${mes.cookbookpictures}"></a>
// //                     <strong class="gx"><span>${mes.efficacyone}</span></strong>
// //                 </div>
// //                 <div class="info">
// //                     <a class="img"></a>
// //                     <div class="infoc" >
// //                         <a  class="linkcb">
// //                             <ul>
// //                                 <li class="gy">${mes.belongto}</li>
// //                                 <li class="kw">${mes.other.tasteid__tastelabel}</li>
// //                                 <li class="nd">${mes.other.styleid__stylename}</li>
// //                             </ul>
// //                         </a>
// //                         <div class="gx2">
// //                             <span>${mes.other.efficacy}</span>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div class="infoma">
// //                     <h3>
// //                         <a>
// //                             ${mes.cookbookname}
// //                         </a>
// //                     </h3>
// //                     <div class="usermessage" name="${mes.other.userphone}">
// //                         <div class="d1">
// //                             <span>${mes.comment}收藏</span>
// //                             <span>${mes.browse}浏览</span>
// //                         </div>
// //                         <a class="author">
// //                             ${mes.other.userphone__userinform__usernickname}
// //                         </a></div>
// //                 </div>
// //             </div>
// //         `
// //     }
// // }
// //==end
//
//
// // // ==========按口味儿筛选==============
// // // 第一步 把数据库口味取出来 渲染上去
// // // 第二步 点击口味  取到口味 放入数组  let
// // // 第三步 lingshi 对比口味
// // // 符合的 放入 xin  --> linshi
// // // 重新调用 所有的方法 --> getpage  shoupage shouindex
// //
// // // 第一步获取口味儿数据
// // let alltaste = [];
// // $.ajax({
// //     url: 'http://127.0.0.1:8000/cookbook/gettaste/',
// //     type: 'get',
// //     data: null,
// //     success: function (res) {
// //         res = JSON.parse(res);
// //         for (let i of res) {
// //             // console.log(i);
// //             alltaste.push(i);
// //         }
// //     },
// //     error: function () {
// //         console.log('402');
// //     }
// // });
// //
// // // 第二步渲染口味儿数据
// // let advertisement = document.querySelector('.j');
// // var putong = document.querySelector('.t');
// // putong.onclick = function () {
// //     showtaste(alltaste)
// // };
// //
// // function showtaste(res) {
// //     advertisement.innerHTML = ``;
// //     let kw;
// //     // console.log('here');
// //     // console.log(res);
// //     // res=JSON.parse(res);
// //     for (let i of res) {
// //         kw = i;
// //         // console.log(kw);
// //         advertisement.innerHTML += `
// //         <span class="k">${kw}味
// //         <span>√</span>
// //         </span>
// //
// //         `;
// //
// //     }
// // }
// //
// //
// //
// //
// // // 给每一个点击的口味一个点击事件
// // let allkwsj=[];
// // let okw;
// // var kw;
// // window.onload = function () {
// //     advertisement.onclick = function (event) {
// //         if (event.target.className == 'k') {
// //             if (okw==event.target.innerText) {
// //                 okw = ''
// //             } else {
// //                 okw = event.target.innerText.substring(0,3);
// //                 // console.log(okw);
// //                 kw = okw;
// //                 console.log(kw);
// //                 $.ajax({
// //                     // async: true,
// //                     type: "get",
// //                     url: "http://127.0.0.1:8000/cookbook/getkw/",
// //                     data:{'con':kw},             //将要求的数据发给后台
// //                     // data: JSON.stringify(kw),
// //                     dataType: "json",            // 要求后台传过来数据要用json格式
// //                     success: function (res) {
// //                         console.log('11111212');
// //                         console.log('0000000',res,'00000000000');
// //                         for (let i of res){        //从后台请求数据成功，执行这句话
// //                             allkwsj.push(i);
// //                             // console.log(allkwsj);
// //                         }
// //                         console.log(startt, endd);
// //                         showkw(startt,endd)
// //                         pagelenc = Math.ceil(allkwsj.length / pagesize);
// //                         showyema();
// //                         getindex(indexi);
// //                     }, error: function () {
// //                         alert('请求失败');
// //                     }
// //
// //                 });
// //             }
// //             // kwshuju.push(event.target.innerText);
// //             // ppkw();
// //             // console.log(kwshuju);
// //             // console.log(event.target.innerText);
// //         } else {
// //             console.log('取消点击');
// //         }
// //     };
// //
// // };
// //
// // function showkw(startt, endd) {
// //     snack_lists.innerHTML = ``;
// //     let mes;
// //     for (let i = startt; i < endd; i++) {
// //         mes = allkwsj[i];
// //         console.log(mes);
// //         snack_lists.innerHTML += `
// //             <div class="cbl" id="${mes.id}">
// //                 <div class="img">
// //                     <a  class="img"><img alt="${mes.baseid__cookbookname}" src="${mes.baseid__cookbookpictures}"></a>
// //                     <strong class="gx"><span>${mes.efficacy}</span></strong>
// //                 </div>
// //                 <div class="info">
// //                     <a class="img"></a>
// //                     <div class="infoc" >
// //                         <a  class="linkcb">
// //                             <ul>
// //                                 <li class="gy">${mes.baseid__belongto}</li>
// //                                 <li class="kw">${mes.tasteid__tastelabel}</li>
// //                                 <li class="nd">${mes.styleid__stylename}</li>
// //                             </ul>
// //                         </a>
// //                         <div class="gx2">
// //                             <span>${mes.efficacy}</span>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div class="infoma">
// //                     <h3>
// //                         <a>
// //                             ${mes.baseid__cookbookname}
// //                         </a>
// //                     </h3>
// //                     <div class="usermessage" name="">
// //                         <div class="d1">
// //                             <span>1 评论</span>
// //                             <span>5033 浏览</span>
// //                         </div>
// //                         <a class="author">
// //                             ${mes.userphone__userinform__usernickname}
// //                         </a></div>
// //                 </div>
// //             </div>
// //         `
// //     }
// // }
// //
// //
// // //==end
//
//
//============按食材筛选==============

var sx=document.querySelector('.shaixuan');
var omsg=document.querySelector('.msg');
var obtnsx=document.querySelector('.btnsx');
var oul=document.querySelector('.myul');
var oli=oul.querySelector('li');

//==第一步请求食材==
// ==从数据库里取出数据后先执行这一步

let allshicai=[];
let aallshicai=[];
$.ajax({
    url: uurl+'cookbook/getoshicai/',
    type: 'get',
    data: null,
    success: function (res) {
        res = JSON.parse(res);
        for (let i of res) {
            // console.log(i);
            allshicai.push(i);
        };
        aallshicai = allshicai;
        showtshicai();
        // console.log(allshicai);
    },
    error: function () {
        console.log('505');
    }
});

//换一批点击事件


//==第二步渲染食材==
// ==再执行这一步
let paixu=document.querySelector('.paixu ul');
let indexs = 1;

bb.onclick = function () {
    if(indexs<(aallshicai.length/6)){
        indexs += 1;
        showtshicai()
    }else{
        indexs = 1;
        showtshicai()
    }

};
function showtshicai() {
    // console.log('-->>>',res);
    paixu.innerHTML = ``;
    let sx;
    // console.log('here');
    // console.log(res);
    // res=JSON.parse(res);
    let datas = aallshicai.slice([indexs-1]*pagesize,indexs*pagesize);
    for (let i of datas) {
        // console.log('--->',i.foodname);
        sx = i.foodname;
        // console.log(kw);
        paixu.innerHTML += `
            <li>
                <span class="food_name" title="${sx}">
                     <span>应季</span>
                     <span>${sx}</span>
                </span>
            </li>
        `;

    }
}


// 第三步（主要），做相关的数据处理
//==对输入的数据和全部数据进行匹配，完成搜索功能==

let shicai;    // 定义一个变量，用来表示刚从所有食材中遍历出来的单个食材
let shuju=[];  // 定义一个数组用来存储匹配好的数据

function panduan(){
    shuju=[];   //防止数据沉淀，循环一轮后置空
    // console.log(omsg.value)
    for(let i of allshicai){   // 遍历所有的食材
        shicai=i.foodname;   // 将刚从所有食材中遍历出来的单个食材暂时赋值给shicai变量
        // console.log(shicai.indexOf(omsg.value)!=-1);
        if(shicai.indexOf(omsg.value)!=-1){   //关键的一步，判断如果shicai表示的食材等于我们输入的值，当等于-1的时候表示匹配失败
            // console.log(shicai);
            indexs = 1;
            shuju.push(i);   // 如果匹配成功，就将食材存入数组shuju中

        }else{
            console.log('--------');
        }
    }
    aallshicai = shuju
showtshicai()   // 注意！！ 执行完程序之后在打印，这里表示将匹配好的数据返回给showshicai进行重新渲染
}


// 最后一步  当点击筛选按钮的时候执行

obtnsx.onclick = function () {
    if (omsg.value) {
        panduan()

    }else{
       aallshicai = allshicai
        panduan()
    }
};
//==end

//==发送食材给sessionStorage
paixu.onclick=function (event) {
    if (event.target.className=='food_name' ||event.target.parentElement.className=='food_name'){
        if(event.target.title){
            sessionStorage.setItem("food_name",event.target.title);
        }else{
            sessionStorage.setItem("food_name",event.target.parentElement.title);
        }
        location.href='shicainew.html'
    }else{
        console.log('404');
    }
};
//
//
//
//
// //=======================分页=========================
// // function getindex(indexi) {
// //     start=(indexi-1)*pagesizes;
// //     end=indexi*pagesizes>linshi.length?linshi.length:indexi*pagesizes;
// //     // console.log(start, end);
// //     showshuju(start,end)
// // }
// //
// // function showyema() {
// //     yemalistt.innerHTML=``;
// //     let mm=indexi+1>pagelen?indexi-2:indexi+2>pagelen?indexi-1:indexi;
// //     // console.log(pagelen);
// //     // console.log(mm);
// //     for(let i=1;i<=3;i++){
// //         if(mm>=1){
// //             yemalistt.innerHTML+=`
// //             <li><a href="#">${mm}</a></li>
// //         `
// //         }
// //         mm++;
// //     }
// //     allliaa=document.querySelectorAll('.pager.fy .linka ul li a');
// // }
// //
// // yemalisttclick.onclick=function (event) {
// //     console.log(event.target.nodeName);
// //     if(event.target.nodeName=='A'){
// //       if(event.target.className=='first'){
// //           if(indexi>1){
// //               indexi--;
// //           }
// //       }else if(event.target.className=='end'){
// //           console.log(indexi < pagelen);
// //           console.log(indexi);
// //           console.log(pagelen);
// //           if(indexi<pagelend){
// //             indexi++;
// //           }
// //       }else{
// //               indexi=parseInt(event.target.innerText);
// //               console.log(indexi);
// //               console.log(event.target.innerText);
// //           }
// //       }
// //
// //   if(indexi*pagesizes+7>linshi.length){
// //       jishuu++;
// //     ajaxgetshuju()
// //   }
// //
// //     getindex(indexi);
// //     showyema();
// // };
// //
// //
// //

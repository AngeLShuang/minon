// let namefood=document.querySelector('.buzhou-top');
// let imgnow=document.querySelector('.jianjie-img');
// let jianjie_main=document.querySelector('.jianjie-main');
// let jiesao=document.querySelector('.buzhou .materials >p');
// let zhuliao=document.querySelector('.zhuliao ');
// let fuliao=document.querySelector('.fuliao ');
// let buzhou=document.querySelector('.buzouzong');
// let changemessage=document.querySelector('.upload-user');
// let pathh=document.querySelector('.body-content ul');
// let uptime;
// let browse;
// let userbrowl,phoneuser;// // 这个phone是发布食谱的用户
// let nowphone=sessionStorage.getItem('tel');
// let clickxiaochi=sessionStorage.getItem('clickid');
// let collect_fenxiang=document.querySelector('.jianjie-top .caipu-collect');
// let dropdowns=document.querySelectorAll('.img-buzhou');
// function oncliks(obj) {
//     for(let i of dropdowns){
//         i.style.display="none";
//     }
//     let div  = obj.nextElementSibling;
//     console.log(div.style.display);
//     console.log(div);
//     if (obj.nextElementSibling.style.display=="block"){
//         obj.nextElementSibling.style.display="none";
//     }else if (obj.nextElementSibling.style.display=="none"){
//         obj.nextElementSibling.style.display="block";
//     }
// };
//
// // window.onload=function () {
// //     sessionStorage.setItem('from','./xiangqing.html');
// //     let data={
// //         'choose':clickxiaochi
// //     };
// //     userbrowl={
// //       'tel':nowphone,
// //       'cookbookid':clickxiaochi
// //     };
// //
// //     ajax('post','http://127.0.0.1:8080/cook/find',data,function (res) {
// //       try {
// //           uptime = res['uploadTime'];
// //           browse = res['browse'];
// //           phoneuser=res['userPhone']
// //       }catch (e) {
// //           uptime='';
// //           browse=''
// //       }
// //       showname(res);
// //       showjianjie(res);
// //       showjieshao(res);
// //       showzhu_fu(res);
// //       showfuliao(res);
// //       showbuzou(res);
// //       showuser(phoneuser);
// //   });
// //     if(sessionStorage.getItem('tel')){
// //         ajax('post','http://127.0.0.1:8080/cook/browljilu',userbrowl,function (resu) {
// //             console.log(resu);
// //         });
// //     };
// // };
//
// function showzhu_fu(res) {
//     zhuliao.innerHTML='';
//     let zhul;
//     try{
//         zhul=res['foodzhu'].split(",");
//     }catch (e) {
//         zhul=[]
//     }
//     for (let i of zhul){
//        if (i){
//             zhuliao.innerHTML+=`
//        <li>
//
//                                 <span class="xinxi">
//                                         <span>
//                                             <a href="">${i}</a>
//                                         </span>
//                                         <span>
//                                             <a href="">购物车</a>
//                                         </span>
//                                     </span>
//                             </li>
//     `
//        }
//     }
// }
//
// function showfuliao(res) {
//      fuliao.innerHTML='';
//      let ful;
//     try{
//          ful=res['foodfu'].split(",");
//     }catch (e) {
//         ful=[]
//     }
//     // console.log(ful);
//     for(let i of ful){
//         if(i){
//             fuliao.innerHTML+=`
//                          <li>
//                                 <a href="">${i}</a>
//
//                             </li>
//     `
//         }
//     }
// }
//
// function showname(res) {
//     // console.log(res);
//     // console.log(namefood);
//     pathh.innerHTML=`
//         <li><a href="index2.html">首页</a></li> >
//             <li><a href="allRecipes.html">小吃大全</a></li> >
//             <li><a href="#">${res.cookbookName}</a></li>
//     `;
//     document.querySelector('.caipu-name').innerHTML=`<span>${res.cookbookName}</span>`;
//     imgnow.innerHTML=`<img src="${res.totalPictures}" alt="${res.cookbookName}">`
//     namefood.innerHTML=`<span style="font-size: 16px">${res.cookbookName}</span>`;
// }
//
// function showjianjie(res) {
//     jianjie_main.innerHTML=`
//         <ul>
//                             <li>
//                                 工艺
//                                 <div>
//                                     ${res.belongTo}
//                                 </div>
//                             </li>
//                             <li>
//                                 难度
//                                 <div>
//                                     1
//                                 </div>
//                             </li>
//                             <li>
//                                 人数
//                                 <div>
//                                     1
//                                 </div>
//                             </li>
//                             <li>
//                                 口味
//                                 <div>
//                                     ${res.tasteLabel}
//                                 </div>
//                             </li>
//                             <li>
//                                 准备时间
//                                 <div>
//                                     30
//                                 </div>
//                             </li>
//                             <li>
//                                 烹饪时间
//                                 <div>
//                                     30
//                                 </div>
//                             </li>
//                         </ul>
//     `
// }
//
// function showjieshao(res) {
//     jiesao.innerHTML=`${res.detailIntroduce}`
// }
//
// function showbuzou(res) {
//     buzhou.innerHTML='';
//     let num=1;
//     let step;
//     try{
//         step=res['stepc'];
//     }catch (e) {
//         step=[];
//     }
//     for(let st of step){
//         // console.log(st);
//         buzhou.innerHTML+=
//         `
//        <div class="buzhou-content">
//                      <span>${num}.</span>
//                         <div>
//                             <p>${st['stepContent']}</p>
//                             <div class="xianshix" onclick="oncliks(this)">显示详情</div>
//                             <div class="img-buzhou">
//                                 <img src="${st['picturesrc']}" alt="">
//                             </div>
//                         </div>
//                     </div>
//         `
//         num++;
//     }
//
// }
//
// function showuser(userPhone) {
//     ajax('post','http://127.0.0.1:8080/cook/findzuoye',{'userPhone':userPhone},function (ress) {
//         console.log(ress);
//         show_jiben(ress);
//     });
// }
//
// function show_jiben(ress) {
//     // console.log(ress);
//     changemessage.innerHTML=`
//                              <div class="upload-img">
//                                 <img src="https://s1.st.meishij.net/user/117/242/t1123117_35029.jpg" alt="">
//                             </div>
//                             <div id="${ress.userPhone}" class="upload-message">
//                                      <span>
//                                         <a  name="caipu" href="#">${ress['userNickname']}</a>
//                                     </span>
//                                 <span>
//                                         <a href="#" name="caipu">菜谱：${ress['havenum']}</a>　
//                                         /　<a href="#" name="guanzhu">关注：${ress['guanzhu']}</a>　
//                                         /　<a href="#" name="guanzhu">粉丝：${ress['fans']}</a>
//                                     </span>
//                                 <span>
//                                         <span>${uptime}　/　</span>
//                                         <span>${browse} 人看过</span>
//                                     </span>
//                             </div>
//     `;
// }
//
// collect_fenxiang.onclick=function (event) {
//     if(event.target.innerText=='收藏'){
//         collect();
//     }else if(event.target.innerText=='分享到'){
//         console.log(event.target.innerText);
//     }
// };
//
// changemessage.onclick=function (event) {
//     // console.log(event.target.parentElement.parentElement.id);
//     sessionStorage.setItem('wantknow',event.target.name);
//     sessionStorage.setItem('herselfid',event.target.parentElement.parentElement.id);
//     // console.log(sessionStorage.getItem('wantknow'));
//     // console.log(sessionStorage.getItem('herselfid'));
//     location.href='otherperson.html';
// };
// function collect() {
//     ajax('post','http://127.0.0.1:8080/cook/collect',userbrowl,function (res) {
//         if(res['code']=='203'){
//             alert('收藏成功')
//         }else if(nowphone){
//             alert('您已收藏')
//         }else{
//             alert('请先登录');
//             location.href='login.html';
//         }
//     });
// }
// let ms=document.querySelectorAll('.motaixiugai');
// document.querySelector('.buzouzong').onclick=function (event) {
//     if(event.target.className=='xianshix'){
//         for(let i of dropdowns){
//             if(i!=event.target.nextElementSibling){
//                 i.style.display="none";
//             }
//         }
//         if(event.target.nextElementSibling.style.display=='block'){
//             event.target.nextElementSibling.style.display='none'
//         }else{
//             event.target.nextElementSibling.style.display='block'
//         }
//     }
//     if(event.target.className=='mythink'){
//         event.target.nextElementSibling.style.display='block';
//     }else if($(event.target).parents('.inner')[0]){
//         window.event?window.event.cancelBubble=true:event.stopPropagation();
//         if(event.target.className=='btnup'){
//             event.target.parentElement.nextElementSibling.style.display='block'
//         }else if(event.target.className=='resbtn') {
//             event.target.parentElement.parentElement.style.display = 'none';
//             event.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.display='none'
//         }
//     }else{
//             for(let i of ms){
//                 i.style.display='none';
//             }
//     }
// };
//
//

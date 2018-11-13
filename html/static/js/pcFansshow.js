let attPeople=document.querySelector('.attPeople');
let my =sessionStorage.getItem('id');
id=window.parent.showid();
function getfans(){
        $.ajax({
            url:uurl+'user/getFans/',
            type:'get',
            data:{'userphone':id,'myphone':my},
            success:function (res) {
                res=JSON.parse(res);
                if(res){
                    shoufans(res)
                }else{
                    console.log('404');
                }
            },
            error:function () {
                console.log('404');
            }
        })
    };

getfans();
function shoufans(res) {
    attPeople.innerHTML=``;
    for(let i of res){
        attPeople.innerHTML+=`
            <div class="row marginten attone" id="${i.phone}">
            <div class="col-md-3 col-sm-3 col-xs-3">
                <a href="#" class="user-headPic">
                    <img src="${i.phone__userinform__headportraitid_id__picture}" class="img-circle wh">
                </a>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <div class="row h4"><span>${i.phone__userinform__usernickname}</span></div>
                <div class="row">关注 <span class="colorrou">${i.countguanzhu}</span> &nbsp; 粉丝 <span class="colorrou">${i.countfans}</span></div>
                <div class="row">${i.countfans}</div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
                <div class="bordertuo attBtn" style="cursor: pointer">${i.guanzhutf}</div>
            </div>
        </div>
        `
    }
}

//关注
let atnum=parent.document.querySelector('.attentiona >span');

function attpeople(node){
    for (let i of $(node).parents('div')){
        if('row marginten attone'==i.className){
            $.ajax({
                url:uurl+'user/guanzhuUser/',
                type:'get',
                data:{'phone':my,'beattephone':i.id},
                success:function (res) {
                    res=JSON.parse(res);
                    if(res['code']=='206'){
                        document.querySelector('.bordertuo.attBtn').innerHTML='取消关注';
                        atnum.innerHTML=parseInt(atnum.innerText)+1;
                    }else{
                        console.log('404');
                    }
                },
                error:function () {
                    console.log('404');
                }
            });
            break
            }
        }
}

//remove
function reattpeople(node){
    for (let i of $(node).parents('div')){
        if('row marginten attone'==i.className){
            $.ajax({
                url:uurl+'user/reguanzhuUser/',
                type:'get',
                data:{'phone':my,'beattephone':i.id},
                success:function (res) {
                    res=JSON.parse(res);
                    if(res['code']=='206'){
                        document.querySelector('.bordertuo.attBtn').innerHTML='关注';
                        atnum.innerHTML=parseInt(atnum.innerText)-1;
                    }else{
                        console.log('404');
                    }
                },
                error:function () {
                    console.log('404');
                }
            });
            break
            }
        }
}

attPeople.onclick=function (event) {
    if(event.target.className !='bordertuo attBtn'){
        for (let i of $(event.target).parents('div')){
        if('row marginten attone'==i.className){
            sessionStorage.setItem('yoursid',i.id);
            parent.window.location.href='personalCenter.html';
            break
            }
        }
    }else{
        if(event.target.innerText=='关注'){
                attpeople(event.target)
        }else if(event.target.innerText=='取消关注'){
                reattpeople(event.target)
        }
    }
};
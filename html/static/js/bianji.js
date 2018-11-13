let getid=sessionStorage.getItem('bianji');

if(getid){
    document.querySelector('.h5.btn.pubcb').innerHTML='保存菜谱';
    document.querySelector('.col-md-4.h4.col-sm-12.col-xs-12.biaoti').innerHTML='保存菜谱';
    var foodshuju={};
    $.ajax({
            type:'get',
            url:uurl+"user/compileCaipu/",
            data:{'getid':parseInt(getid)},
            // ContentType:"application/x-www-form-urlencoded",
            async : false,
            success:function (res) {
                res=JSON.parse(res);
                foodshuju=res;
                showcookbook()
            },
            error:function () {
                console.log('编辑失败');
            },
        });
    let gongxiao=document.querySelector('.row.addsmallEfficacy > div');
    function showcookbook() {
    document.querySelector('.form-group.name > input').value=foodshuju.baseid__cookbookname;
    document.querySelector('.btn.btn-sm.dq').innerText=foodshuju.styleid__stylename;
    document.querySelector('.btn.btn-sm.gy').innerText=foodshuju.baseid__belongto;
    document.querySelector('.btn.btn-sm.kw').innerText=foodshuju.tasteid__tastelabel;
    for(let i of foodshuju.efficacy){
        document.querySelector('.row.addsmallEfficacy > div').innerHTML+=`
            <div class="bordergrey sh f">#<span class="sp1">${i}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>
        `
    }
    document.querySelector('.form-control.cbintro').value=foodshuju.detailintroduce;
    document.querySelector('.positionRela').innerHTML+=`
    <img class="imge showPic bordnone lh objextfit displaynone displaynblock" alt="请重新选择成品图" src="${foodshuju.baseid__cookbookpictures}">   
    `;
    document.querySelector('.col-md-12.yuancailiao').innerHTML=``;
    for(let k of foodshuju.foodzhu){
        document.querySelector('.col-md-12.yuancailiao').innerHTML+=`
        <div class="namemater f zhu">
                                <div class="namemater f">
                                    <input type="email" class="form-control pore" value="${k}" placeholder="比如:面粉">
                                </div>
                                <div class="consumater f">
                                    <input type="email" class="form-control pore" placeholder="比如:200克">
                                </div>
                                <div class="picmater marginten f">
                                    <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                                </div>
                            </div>
    `
    }

    document.querySelector('.col-md-12.fuliao').innerHTML=``;
    for(let p of foodshuju.foodfu){
        document.querySelector('.col-md-12.fuliao').innerHTML+=`
        <div class="namemater f fu">
                                <div class="namemater f">
                                    <input type="email" class="form-control pore" value="${p}" placeholder="比如:食盐">
                                </div>
                                <div class="consumater f">
                                    <input type="email" class="form-control pore" placeholder="比如:1茶匙">
                                </div>
                                <div class="picmater marginten f">
                                    <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                                </div>
                            </div>
    `
    }

    let num=0;
    document.querySelector('.col-lg-12.stepdiv.cc').innerHTML=``;
    for(let j of foodshuju.buzou){
        num++;
        document.querySelector('.col-lg-12.stepdiv.cc').innerHTML+=`
            <div class="margint of">
            <div class="text-center h3 numstep h f">${num}.</div>
            <div class="picstep hidden-xs hidden-sm f">
                <ul class="dy-ul-list">
                    <div class="upload-pics">
                        <a href="####" class="dy-upload-a">
                            <i class="dy-i"></i>
                            <span class="dy-up-span">上传</span>
                            <div class="up-input">
                               <img src="${j.picturesrc}" alt="">
                            </div>
                         </a>
                    </div>
                </ul>
            </div>
            <div class="desstep f">
                <textarea name="te" class="h mutext" >${j.stepcontent}</textarea>
             </div>
                                <div class="cdstep f">
                                    <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-upload cross ba" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-download cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-plus-sign cross" aria-hidden="true"></span>
                                </div>
                            </div>
        `
    }
}


}
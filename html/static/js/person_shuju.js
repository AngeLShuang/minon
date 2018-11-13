sessionStorage.setItem('from','personalCenter.html');
let guanzhufans=document.querySelector('.row.guanzhufans');
let listall=document.querySelector('.list-group.text-right.perlist');
let ifa=document.querySelector('.embed-responsive-item');
let yoursid=sessionStorage.getItem('yoursid');
let my=sessionStorage.getItem('id');
let userFileImg=document.querySelector('.user-header-img');
let userFile=document.querySelector('.user-header-img .user-file');
let id;
userFileImg.onmouseover=function () {
    userFile.style.display="block";
};

userFileImg.onmouseout=function () {
    userFile.style.display="none";
};
//判断下
if(yoursid && my!=yoursid){
    id=yoursid;
    document.querySelector('.fontthree').style.display='none';
}else{
    id=my
}
    $.ajax({
        url:uurl+'user/getUserByuserPhone',
        type:'get',
        data:{'id':id},
        dataType:'json',
        success:function (res) {
            if(res.code==209){
                changeguanzhu(res);
            }else{
                window.location.href='404-page.html'
            }
        },
        error:function () {
            window.location.href='404-page.html'
        }
    });
    //调用方法
    // getmycookbook();
    //获得关注fans人数
    function changeguanzhu(res) {
        document.querySelector('.col-lg-8.h4.nick').innerHTML=res.sign.usernickname;
        document.querySelector('.col-lg-12.intro').innerHTML=`${res.sign.usersign}`;
        document.querySelector('.img-circle.wh').src=res.sign.headportraitid__picture;
        guanzhufans.innerHTML=`
                    <div class="col-lg-6"><a class="attentiona" >关注<span>${res.guanzhu}</span></a></div>
                    <div class="col-lg-6"><a class="fansa" >粉丝<span>${res.fans}</span></a></div>
                `
    }

    // //获得本人菜谱
    // function getmycookbook(id) {
    //     $.ajax({
    //         url:uurl+'user/getUserCookbook/',
    //         type:'get',
    //         data:{'userphone':id},
    //         success:function (res) {
    //             res=JSON.parse(res);
    //             //渲染
    //             document.querySelector('.embed-responsive-item').contentWindow.showcblist(res);
    //             if(yoursid && my!=yoursid){
    //                 document.querySelector('.embed-responsive-item').contentWindow.hideedit();
    //                 }
    //         },
    //         error:function () {
    //             console.log('404');
    //         }
    //     })
    // }
    //
    // //获得本人动态
    // function getmydynamic(){
    //     $.ajax({
    //         url:uurl+'dynamic/getUserDynamic/',
    //         type:'get',
    //         data:{'userphone':id},
    //         success:function (res) {
    //             res=JSON.parse(res);
    //             //渲染
    //             document.querySelector('.embed-responsive-item').contentWindow.showdylist(res)
    //         },
    //         error:function () {
    //             console.log('404');
    //         }
    //     })
    // }
    //
    // //获得关注的人
    // function getguanzhu(){
    //     $.ajax({
    //         url:uurl+'user/getUserFans/',
    //         type:'get',
    //         data:{'userphone':id,'myphone':my},
    //         success:function (res) {
    //             res=JSON.parse(res);
    //             if(res){
    //                 document.querySelector('.embed-responsive-item').contentWindow.showatten(res)
    //             }else{
    //                 console.log('404');
    //             }
    //         },
    //         error:function () {
    //             console.log('404');
    //         }
    //     })
    // }
    //
    // function getfans(){
    //     $.ajax({
    //         url:uurl+'user/getFans/',
    //         type:'get',
    //         data:{'userphone':id,'myphone':my},
    //         success:function (res) {
    //             res=JSON.parse(res);
    //             if(res){
    //                 document.querySelector('.embed-responsive-item').contentWindow.shoufans(res)
    //             }else{
    //                 console.log('404');
    //             }
    //         },
    //         error:function () {
    //             console.log('404');
    //         }
    //     })
    // }


    function showid(){
        return id
    }
    function yourss(){
        return yoursid
    }
    function mymy(){
        return my
    }
    //判断点击的是什么菜谱 动态
    listall.onclick=function (event) {
        if(event.target.id){
            ifa.src=event.target.id;

        }

    };

    guanzhufans.onclick=function (event) {

            if (event.target.className == 'attentiona') {
                ifa.src = './pcAttention.html';
                // getguanzhu();
            } else if (event.target.className == 'fansa') {
                ifa.src = './pcFans.html';
                // getfans();
            }

    };


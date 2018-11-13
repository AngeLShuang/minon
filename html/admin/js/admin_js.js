let left_nva=$('.col-md-2.content-left');
let yeslogin=$('.dropdown.yeslogin');
let nologin=$('.dropdown.nologin');
let zhuxiao=$('.zhuxiao');
let clearall=$('.clearall');
let flag;
let tel;
let xinxi;
let body_content=$('.col-md-10.content ul');
let damulv=$('.col-md-3.bignva span');
let xiaomulv=$('.col-md-3.smallnva span');
let mulvchoose=$('.col-md-2.mulu ul');
$(function () {
    flag=sessionStorage.getItem('flag');
    if(flag){
        yeslogin.css('display','block');
        nologin.css('display','none');
        tel=localStorage.getItem('tel');
        myxinxi(tel);
    }else{
        nologin.css('display','block');
        yeslogin.css('display','none');
    }
});
zhuxiao.click(function () {
   sessionStorage.clear();
   window.location.reload()
});
clearall.click(function () {
   sessionStorage.clear();
   localStorage.clear();
});
left_nva.click(function (event) {
    if(event.target.className=='dropdown-toggle'){
        let c=event.target.nextElementSibling;
        let aa=$('[data-toggle="dropdown"]');
        if(! c.style.display || c.style.display=='none'){
            for(let i of aa){
                // console.log(i);
                $(i).next().css('display','none')
            }
            c.style.display='block';
            console.log($(event.target).attr('name'));
            $('iframe').attr('src',$(event.target).attr('name')+'.html')
        }else{
            c.style.display='none';
        }

    }
});


$('.nav.nav-pills.nav-stacked').click(function (event) {

    if($(event.target).parent().parent().parent().attr('name')=='person'){
        $('iframe').attr('src','gerenxinxi.html');
        damulv.text('个人信息');
        if($(event.target).text()=='修改个人信息'){
            xiaomulv.text('查看个人信息');
             $('iframe')[0].contentWindow.clickone(event)
        }else if($(event.target).text()=='修改个人密码'){
            xiaomulv.text('修改个人密码');
            $('iframe')[0].contentWindow.clickthree(event);
        }else{

        }
    }else if($(event.target).parent().parent().parent().attr('name')=='guanliyonghu'){
        $('iframe').attr('src','guanliyonghu.html');
        damulv.text('管理用户');
        if($(event.target).text()=='增加用户'){
            xiaomulv.text('增加用户');
            // showmyself()
        }else if($(event.target).text()=='修改用户'){
            xiaomulv.text('修改用户');
        }else if($(event.target).text()=='删除用户'){
            xiaomulv.text('删除用户');
        }else if($(event.target).text()=='查询用户'){
            xiaomulv.text('查询用户');
        }
    }


});

let wenben;
$('.motaikuang').click(function () {
    $('.motaikuang').css('display','none');
});
$('.innerm').click(
   function (event) {
        event.stopPropagation()
   }
);
$('.srue').click(
  function () {
      $('.motaikuang').css('display','none');
      wenben=$('.change').val();
      $('.change').val('');
      let inputkuang=$('iframe')[0].contentWindow.getinput();
      inputkuang.text(wenben);
      // console.log(inputkuang.parent().attr('class'));
      changemessage(inputkuang.parent().attr('class'),wenben)
  }
);

//修改数据 ajax
function changemessage(name,value) {
    let message={
        'name':name,
        'value':value,
        'tel':tel
    };
    console.log(message);
    $.ajax({
        url: 'http://127.0.0.1:8080/user/guanlichange',
        type: 'post',
        data: JSON.stringify(message),
        dataType: 'json',
        success: function (res) {
            console.log(res);
            },
        error: function () {
            console.log('404');
            },
    })
}


//查看个人信息
function myxinxi(tel) {
     $.ajax({
            url: 'http://127.0.0.1:8000/admin_ser/getadminmessage',
            type: 'get',
            data: {'tel':tel},
            success: function (res) {
                 xinxi=JSON.parse(res);
                console.log(xinxi);
                console.log(typeof xinxi);
                $('.dropdown.yhm').text(xinxi['userNickname']);
                },
            error: function () {
                console.log('404');
                },
        })
}

//吧个人信息封成方法 给子页面调用
function setperson() {
    return xinxi
}

//show个人信息
function showmyself() {
    mulvchoose.html(`<li>基本信息</li>
                        <li>详细信息</li>
                           <li>☆</li>
                           <li>☆</li>`);
    body_content.html(`
        <li>个人信息</li>
                        <li>
                            <div class="row yhm-soup">
                                <div class="col-md-2">
                                    <span>用户名为：</span>
                                </div>
                                <div class="col-md-4">
                                    <span>${xinxi['userNickname']['userPhone']}</span>
                                </div>
                                <div class="col-md-2">
                                    <span></span>
                                </div>
                                <div class="col-md-4">
                                    <span></span>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="row yhm-soup">
                                <div class="col-md-2">
                                    <span>昵 称为：</span>
                                </div>
                                <div class="col-md-4">
                                    <span>${xinxi['userNickname']['userNickname']}</span>
                                </div>
                                <div class="col-md-2">
                                    <span>邮 箱为：</span>
                                </div>
                                <div class="col-md-4">
                                    <span>${xinxi['userNickname']['userEmail']}</span>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="row yhm-soup">
                                <div class="col-md-2">
                                    <span>是否为管理 ：</span>
                                </div>
                                <div class="col-md-4">
                                    <span>${xinxi['isadmin']}</span>
                                </div>
                                <div class="col-md-2">
                                    <span></span>
                                </div>

                            </div>
                        </li>

        
    `)
}
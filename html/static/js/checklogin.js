//验证是否登陆

let flag=sessionStorage.getItem('flag');
let token=sessionStorage.getItem('token');
let qid=sessionStorage.getItem('id');
if(flag && token && qid){
    let user={'id':qid,
        'token':token
    };
    $.ajax({
        url:uurl+'user/chklogin/',
        type:'post',
        data:JSON.stringify(user),
        dataType:'json',
        success:function (res) {
            if(res['code']){
            }else{
               window.location.href='index.html'
            }
        },
        error:function () {
            window.location.href='templates/index2.html'
        }
    })
}else{
    res=window.location.href.toString().split('/');
    rl=(window.location.href).toString().split('/')[res.length-1].slice(0,10);
    window.location.href=rl=='index2.html'?'####':rl=='index.html' || !rl?'templates/index2.html':'index2.html';
}
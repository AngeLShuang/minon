let tel=null;
let password=null;
$(function () {
    tel=localStorage.getItem('tele');
    password=localStorage.getItem('password');
    let ischoose=localStorage.getItem('chk');
    if(tel && password){
        $('input[name=tel]').val(tel);
        $('input[name=password]').val(password);
        $("#chk").attr("checked",ischoose);
    }
});

 $('#btn').click(function() {

        let tel=$("[name='tel']");
        let password=$("[name='password']");
        let data={
            'tel':tel.val(),
            'password':password.val()
        };

        $(function () {
            let chk=$("#chk").get(0).checked;
            $.ajax(
                {
                    url: 'http://127.0.0.1:8000/admin_ser/login/',
                    type: 'post',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function (res,textStatus,xhr) {
                        console.log(res);
                        localStorage.clear();
                        sessionStorage.clear();
                        if(chk){
                            localStorage.setItem('tel',res.id);
                            localStorage.setItem('tele',data.tel);
                            localStorage.setItem('password',data.password);
                            localStorage.setItem('token',xhr.getResponseHeader('token'));
                            localStorage.setItem('chk',chk);
                        }else{
                            console.log(res);
                            localStorage.clear()
                        }
                        sessionStorage.setItem('flag',true);
                        // console.log(localStorage.getItem('token'));
                        window.location.href='admin.html';
                    },
                    error: function () {
                        console.log('403');
                    },
                })

        });
    });

  $('#btn1').click(function() {
        let tel=$("[name='tel']");
        let password=$("[name='password']");
        let password2=$("[name='password2']");
        let data={
            'tel':tel.val(),
            'password':password.val(),
            'password2':password2.val(),
        };

        $(function () {
            let chk=$("#chk:checked").val();
            $.ajax(
                {
                    url: 'http://127.0.0.1:8000/regist',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('token', ' ')
                    },
                    success: function (res) {
                        localStorage.clear();
                        sessionStorage.clear();
                        if(chk){
                            localStorage.setItem('tel',data.tel);
                            localStorage.setItem('password',data.password);
                            localStorage.setItem('token',res.token);
                            localStorage.setItem('chk',chk);
                        }else{
                            console.log(res);
                            localStorage.clear()
                        }
                        sessionStorage.setItem('flag',true);
                        window.location.href='index2.html';
                    },
                    error: function () {
                        console.log('403');
                    },
                })

        });
    });
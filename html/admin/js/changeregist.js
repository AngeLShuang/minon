let password2=$('#inputPassword2');
let btn=$('#btn');
let btn1=$('#btn1');
let changtext=$('.btn.text-muted.center-block small');

changtext.click(function() {
    console.log(btn.text());
    let textc=$('.btn.text-muted.center-block small strong');
    if(textc.text()=="login"){
        btn.css('display','block');
        btn1.css('display','none');
        $('input[name=tel]').focus();
        changtext.html("还没有账号 去<strong>regist</strong> ...&nbsp;");
        tel=localStorage.getItem('tel');
        password=localStorage.getItem('password');
        let ischoose=localStorage.getItem('chk');
        if(tel && password){
            $('input[name=tel]').val(tel);
            $('input[name=password]').val(password);
            $("#chk").get(0).checked=ischoose;
                }

    }else{
        btn1.css('display','block');
        btn.css('display','none');
        changtext.html(" <strong>login</strong>了解一下 ...&nbsp;");
        $('input[name=tel]').val('').focus();
        $('input[name=password]').val('');
        $("#chk").get(0).checked=false;

    }
    password2.toggle(800);

});
let sx = document.querySelector('.saixuan');
let selectin = document.querySelector('.saixuan .xiala');
let pingfen = document.querySelector('.xing');
let pingfensxing = document.querySelectorAll('.xing > span');
let pinfenxians = document.querySelector('.fabucontent .gei .tt');
let ii=sessionStorage.getItem('id');
let num = 0;
let thiscom,textare;
sx.onclick = function () {
    if ($('.xiala').css('display') == 'block') {
        $('.xiala').hide(200)
    } else {
        $('.xiala').show(200)
    }
};
selectin.onclick = function (event) {
    if (event.target.nodeName == 'SPAN') {
        let t = document.querySelector('.saixuan span').innerText;
        document.querySelector('.saixuan span').innerText = event.target.innerText;
        event.target.innerText = t;
    }
};

pingfen.onmousemove = function (event) {
    //-56 -105
    for (let i = 4; i >= 0; i--) {
        $(pingfensxing[i]).css('background-position', '0px -105px')
    }
    setpingyu(event.target.getAttribute('name'));
    if (event.target.nodeName == 'SPAN') {
        for (let i = 0; i < event.target.getAttribute('name'); i++) {
            $(pingfensxing[i]).css('background-position', '0px -56px')
        }
    }
};

pingfen.onmouseleave = function () {
    //-56 -105
    for (let i = 5; i >= 0; i--) {
        $(pingfensxing[i]).css('background-position', '0px -105px')
    }
    if (num) {
        for (let i = 0; i < num; i++) {
            $(pingfensxing[i]).css('background-position', '0px -56px')
            setpingyu(num)
        }
    } else {
        pinfenxians.innerText = '点击星星为它评分'
    }
};

pingfen.onclick = function (event) {
    for (let i = 0; i < event.target.getAttribute('name'); i++) {
        num = parseInt(event.target.getAttribute('name'));
    }
};

function setpingyu(node) {
    if (node == 1) {
        pinfenxians.innerText = '很差'
    } else if (node == 2) {
        pinfenxians.innerText = '差'
    } else if (node == 3) {
        pinfenxians.innerText = '一般'
    } else if (node == 4) {
        pinfenxians.innerText = '好'
    } else if (node == 5) {
        pinfenxians.innerText = '很好'
    }
}

$(".cont")[0].oninput = function () {
    var old_val = $(this).val().toString();
    $(".zinum .nn").text(old_val.length);
    if (old_val.length > 200) {
        $('.fabu button').attr('disabled', 'true');
        $('.fabu button').css('opacity', 0);
        $('.zinum small').text('字数不能超过200');
        $('.zinum small').css('color', 'red')
    } else {
        $('.fabu button').removeAttr('disabled');
        $('.zinum small').text('200');
        $('.zinum small').css('color', 'black');
        $('.fabu button').css('opacity', 1);
    }
};

let huifu_con = document.querySelector('.commentlist');

// let btnhuifu = document.querySelector('.btnhuifu');
let fabu=document.querySelector('.fabu .btnfabu');
let fabutext=document.querySelector('.comment-text textarea');

huifu_con.onclick = function (event) {
    if (event.target.className == 'huifucomment') {
        event.target.parentElement.parentElement.nextElementSibling.style.display = 'block';
        thiscom=event.target.parentElement.parentElement.parentElement.parentElement.id;
        textare=$(event.target).parents('.commentitem').find('textarea');

    } else if(event.target.className == 'btnquxiao'){
         event.target.parentElement.parentElement.parentElement.style.display = 'none';
    } else if(event.target.className == 'btnhuifu'){

        if(ii){
            let comcen={
          'content':textare.val(),
            'userphone_id':sessionStorage.getItem('id'),
            'dynamicid_id':dyid,
            'firstcomment_id':thiscom
        };
            $.ajax({
                url:uurl+'dynamic/setDynamicComm/',
                type:'post',
                data:JSON.stringify(comcen),
                success:function (res) {
                    res=JSON.parse(res);
                    if(res.code=='205'){
                       swal(
                             '评论成功！',
                             ' ',
                               'success'
                             );
                       setTimeout(function () {
                           window.location.href='dynamics_Details.html'
                       },1000);
                    }
                },
                error:function () {
                    console.log('404');
                }
            })
        }else{
            swal(
                '请先登录',
                '',
                'error'
            )
        }

        
    }
};
let n = 1;

fabu.onclick=function () {
    if(ii){
        let comcen2 = {
        'content': fabutext.value,
        'userphone_id': sessionStorage.getItem('id'),
        'dynamicid_id': dyid,
        'firstcomment_id': null
    };
        $.ajax({
            url: uurl+'dynamic/setDynamicComm/',
            type: 'post',
            data: JSON.stringify(comcen2),
            success: function (res) {
                res = JSON.parse(res);
                if (res.code == '205') {
                    window.location.href = 'dynamics_Details.html'
                }
            },
            error: function () {
                console.log('404');
            }
        })
    }else{
        swal(
            '请先登录',
            '',
            'error'
        )
    }


};
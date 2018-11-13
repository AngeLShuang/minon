sessionStorage.setItem('from', 'edit_personal.html');
let myid = sessionStorage.getItem('id');
let headpic = document.querySelector('.headpic');
let nic = document.querySelector('.nic');
let te = document.querySelector('.te');
let input_sm = document.querySelector('.input-sm.form-control');
let sen = document.querySelector('#home_province');
let shi = document.querySelector('#home_province');
let prefess = document.querySelector('.form-control.prefess');
let sign = document.querySelector('.form-control.sign');


$('.changeheader').on("change", function (e) {
    var file = e.target.files[0]; //获取图片资源

    // 只选择图片文件
    if (!file.type.match('image.*')) {
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读取文件
    // 渲染文件
    reader.onload = function (arg) {
        // document.querySelector('.headpic').src = arg.target.result
    };

    $.ajax({
        url: uurl+'user/getimgtoken/',
        type: 'get',
        data: {'userphone': myid},
        success: function (res) {
            var token = res.uptoken;
            var newname = res.key;

            var newfile = new File([file], newname);

            var config = {
                useCdnDomain: false,
                disableStatisticsReport: true,
                retryCount: 6,
                region: qiniu.region.z0
            };
            var putExtra = {
                fname: "",
                params: {},
                mimeType: ["image/png", "image/jpeg", "image/gif"]
            };
            var key = newfile.name;
            // 添加上传dom面板
            putExtra.params["x:name"] = key.split(".")[0];
            var subscription;
            // 调用sdk上传接口获得相应的observable，控制上传和暂停
            observable = qiniu.upload(file, key, token, putExtra);

            subscription = observable.subscribe({
                next(res) {
                    // ...
                },
                error(err) {
                    swal(
                        'error！',
                        ' ',
                        'error'
                    );
                },
                complete(res) {
                    swal(
                        '上传成功！',
                        ' ',
                        'success'
                    );
                    document.querySelector('.headpic').src = 'http://pgsnqecfs.bkt.clouddn.com/' + newname
                }
            });

        }
    })  //end ajax

});


ajax('get', 'http://106.14.198.191:8000/user/getUserAllMessageByuserPhone', {'myid': myid}, function (res) {
    showmyself(res);
});


function showmyself(res) {
    headpic.src = res.headportraitid__picture;
    nic.value = res.usernickname;
    te.innerHTML = res.userphone__telephone;
    document.querySelector('.account-username.p').innerHTML = res.userphone__telephone;
    document.querySelector('.form-control.oldphone').setAttribute('placeholder', res.userphone__telephone.slice(0, 3) + '****' + res.userphone__telephone.slice(7, 12));
    input_sm.value = res.headportraitid__userinform__userbriday;
    home_province.value = res.userprovince + '省';
    home_city.value = res.userphone__userinform__usercity + '市';
    prefess.value = res.headportraitid__userinform__professionid__occupation;
    sign.value = res.usersign;

    if (res.usersex == '男') {
        document.querySelector('input[value="option1"]').setAttribute('checked', 'true')
    } else {
        document.querySelector('input[value="option2"]').setAttribute('checked', 'true')
    }

}

document.querySelector('.modify.xs').onclick = function (event) {
    if (event.target.previousElementSibling.getAttribute('readonly')) {
        event.target.previousElementSibling.removeAttribute('readonly');
        document.querySelector('.modify.xs').innerHTML = '确定';
        event.target.previousElementSibling.style.border = '1px grey solid';
    } else {
        event.target.previousElementSibling.setAttribute('readonly', true);
        document.querySelector('.modify.xs').innerHTML = '修改';
        event.target.previousElementSibling.style.border = '1px white solid';
        $.ajax({
            url: uurl+'user/changeUserNickname/',
            type: 'post',
            data: JSON.stringify({
                'userphone': myid,
                'nickname': nic.value
            }),
            success: function (res) {
                res = JSON.parse(res);
                if (res.code == '201') {
                    console.log('成功');
                } else {
                    console.log('err');
                }
            },
            error: function () {
                console.log('404');
            }
        })
    }

};

document.querySelector('.btn.btn-info').onclick = function () {
    let user = {
        'headpic': headpic.src,
        'nic': nic.value,
        'te': myid,
        'input_sm': input_sm.value,
        'home_province': home_province.value,
        'home_city': home_city.value,
        'prefess': prefess.value,
        'sign': sign.value
    };
    $.ajax({
        url: uurl+'user/setUserMessageByuserPhone/',
        type: 'post',
        data: JSON.stringify(user),
        success: function (res) {
            res = JSON.parse(res);
            if (res.code == '201') {
                swal(
                    '修改成功！',
                    '你点击了按钮！',
                    'success'
                )
            } else {
                swal(
                    '请刷新重试！',
                    '你点击了按钮！',
                    'error'
                )
            }
        },
        error: function () {
            console.log('404');
        }
    })
};
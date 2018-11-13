sessionStorage.setItem('from', 'dynamics_Details.html');
let dyone;     //存放当前动态的信息
let flagall = [];  //该动态的所有标签
let relady = [];  //用户的其他作品
let commentall = {}; //该动态的所有评论
let dyid = sessionStorage.getItem('dynamicid');
let phone = sessionStorage.getItem('id');


let user = {
    "id": dyid,
};

$(function () {
    getdyinfo();
    getcommentinfo();    //vue没写呢
});

//获取该动态的所有评论
function getcommentinfo() {
    $.ajax({
        url: uurl+'dynamic/getDynamicomm/',
        type: 'get',
        data: user,
        dataType: 'json',
        success: function (res) {
            commentall = res;
            showdynamic()
        },
        error: function () {
            console.log('404');
        }
    });
}
let comlist=document.querySelector('.commentlist');
function showdynamic() {
    comlist.innerHTML='';
    for(let i of commentall){
        let pic;
        if(! i.firstcomment){
            pic='';
            for (let j of i.pic){
                pic+=`
                    <div class="com-img-item" >
                       <div class="i"><img src="${j.picturesrc}" alt=""></div>
                         <div class="big-comitem">
                             <img src="${j.picturesrc}" alt="">
                          </div>
                          </div>
                `
            }
            comlist.innerHTML+=`
                <div class="commentitem" id="${i.id}">
                                <div class="comment-headerpoint">
                                    <img src="${i.userphone__userinform__headportraitid__picture}" alt="">
                                    <span>${i.userphone__userinform__usernickname}</span>
                                </div>
                                <div class="content">
                                    <div class="grade">
                                            <span class="f">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </span>
                                        <span class="t">${i.time}</span>
                                    </div>
                                    <div class="con">
                                        <p>
                                            ${i.content}</p>
                                    </div>
                                    <div class="con-img">
                                       ${pic}
                                    </div>
                                    <div class="com">
                                        <span class="gd"><span></span> <small>4</small></span>
                                        <span name="快乐的美羊羊">
                                                <span>举报</span>
                                                <span class="huifucomment">0条回复</span>
                                            </span>
                                    </div>
                                    <div class="comment-div">
                                        <div class="gllist">
                                            
                                        </div>
                                        <div class="ext">
                                            <div class="ta">
                                                <textarea name="" cols="30" rows="3"></textarea>
                                            </div>
                                            <div class="qbtn">
                                                <span></span>
                                                <span class="btnhuifu">确定</span>
                                                <span class="btnquxiao">取消</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `
        }
        showfirstcom(i)
    }
}

function showfirstcom(i) {
            let num=0;
            let firstcom=$('#'+i.id).find('.gllist');
            let numcom=$('#'+i.id).find('.huifucomment');
            firstcom.html(' ');
        for(let k of commentall){
            if(k.firstcomment && k.firstcomment==i.id){
                num++;
                firstcom[0].innerHTML+=`
                    <div class="comment-gitem" id="${k.id}">
                                                <div class="pheader">
                                                    <div>
                                                        <img src="${k.userphone__userinform__headportraitid__picture}" alt="">
                                                    </div>
                                                </div>
                                                <div class="p-content">
                                                    <div class="uu-co">
                                                        <span class="uu">
                                                            <span class="n">${k.userphone__userinform__usernickname}</span>
                                                            <span class="t">${k.time}</span>
                                                        </span>
                                                        <span class="anser" >
                                                            <span>举报</span>
                                                            <a class="huifucomment">${num}条回复</a>
                                                        </span>
                                                    </div>
                                                    <div class="true-comtent">
                                                        <span>@${i.userphone__userinform__usernickname}：${k.content}</span>
                                                    </div>
                                                </div>
                                            </div>
                `
            }
            numcom.html(`${num}条回复`)
        }
        return firstcom
}


//评论区的头像
var headerpoint = document.querySelector('.headerpoint img');

//根据动态id获取id具体信息
function getdyinfo() {
    $.ajax({
        url: uurl+'dynamic/getdynamicall/',
        type: 'get',
        data: user,
        dataType: 'json',
        success: function (res) {
            dyone = res[0];
            showdydata();
            getflagdata();
            showuserdata();
            getreladata();
            if (dyone.userid == parseInt(sessionStorage.getItem('id'))) {
                document.querySelector('.btn-area').style.display = 'none';
            }

            //评论区头像及用户id
            headerpoint.id = sessionStorage.getItem('id');
            headerpoint.src = dyone.picture;
        }
    });

}

//获取用户的其他作品
function getreladata() {
    let user = {
        "id": dyone.userid,
    };
    $.ajax({
        url: uurl+'dynamic/getUserDynamicper/',
        type: 'get',
        data: user,
        dataType: 'json',
        success: function (res) {
            for (let i of res) {
                if (i.id != dyone.id) {
                    relady.push(i);
                }
            }
            showreladata()
        }
    })
}

//展示用户的其他作品
var piclistbox = document.querySelector('.pic-list-box');
var showconbox = document.querySelector('.show-con-box');

function showreladata() {
    if (relady.length != 0) {
        for (let i of relady) {
            biaoti = i.title.length < 13 ? i.title : i.title.substr(0, 13) + '...';
            piclistbox.innerHTML += `
            <li>
                <a href="./dynamics_Details.html">
                    <img src="${i.picuture}" alt="${i.title}" id="${i.id}">
                </a>
                <div class="pic-name">
                    <a href="./dynamics_Details.html" id="${i.id}">${biaoti}</a>
                </div>
            </li>`
        }
    } else {
        showconbox.style.display = 'none';
    }
}

//其他动态点击事件
piclistbox.onclick = function (event) {
    let eve = event.target;
    sessionStorage.setItem("dynamicid", eve.id);
};

var retime = document.querySelector('.li-time p');  //文章创作时间
var dybiaoti = document.querySelector('.biaoti');  //文章创作时间
var riqi = document.querySelector('.title-time span');  //文章创作时间
var content = document.querySelector('.text-con');  //文章创作时间
var datu = document.querySelector('.reveal-work-wrap img');  //文章创作时间
//展示当前动态数据
function showdydata() {
    content.innerHTML = dyone.content;
    retime.innerHTML = dyone.time;
    dybiaoti.innerHTML = dyone.title;
    datu.src = dyone.picuture;
    datu.alt = dyone.title;
    dateform()
}

//Ta的主页
var home = document.querySelector('.home-page');
home.onclick = function () {
    sessionStorage.setItem("yoursid", dyone.userid);
};

//日期格式转换
function dateform() {
    let n = (Date.now() - new Date(dyone.time)) / 1000;   //发布日期格式
    let days = parseInt(n / (24 * 60 * 60));
    if (days <= 3 && days > 0) {
        riqi.innerHTML = days + '天前';
    } else if (days == 0) {
        riqi.innerHTML = '今天';
    } else if (days > 3) {
        riqi.innerHTML = dyone.time;
    }
}

var usertou = document.querySelector('.userinfo img');  //用户头像
var usernick = document.querySelector('.user-name a');  //用户昵称
var usercity = document.querySelector('.position-info span:nth-child(1)'); //用户城市
var useroccupation = document.querySelector('.position-info span:nth-child(2)');  //用户职业
//展示用户信息
function showuserdata() {
    usertou.src = dyone.picture;
    usernick.innerHTML = dyone.userNickname;
    if (dyone.city) {
        usercity.innerHTML = dyone.city;
    } else {
        usercity.innerHTML = '中国'
    }
    if (dyone.occupation) {
        useroccupation.innerHTML = dyone.occupation;
    } else {
        useroccupation.innerHTML = '米农用户'
    }
}

//头像点击事件
usertou.onclick = function () {
    console.log('here');
    sessionStorage.setItem('yoursid', dyone.userid);
    location.href='personalCenter.html'
};

//得到该动态的所有标签
function getflagdata() {
    let shuju = {
        "id": dyone.id,
    };
    $.ajax({
        url: uurl+'dynamic/getdynam/',
        type: 'get',
        data: shuju,
        dataType: 'json',
        success: function (res) {
            for (let i of res) {
                flagall.push(i);
            }
            showflagdata();
        }
    })
}

//展示该动态的所有标签
var aflag = document.querySelector('.aflag');

function showflagdata() {
    let flagcolor = ["label label-default", "label label-primary", "label label-success", "label label-info", "label label-warning", "label label-danger"]
    if (flagall.length != 0) {
        for (let i of flagall) {
            let index = Math.floor((Math.random() * flagcolor.length));
            let spanclass = flagcolor[index];
            aflag.innerHTML += `
         <span title="${i.label}" class="${spanclass}" id="${i.id}">${i.label}</span>
    `
        }
    } else {
        aflag.style.display = 'none';
    }
}

aflag.onclick = function (event) {
    eve = event.target;
    sessionStorage.setItem('condition', eve.innerHTML);
    location.href = 'dynamic.html'
}

//关注
var guanzhu = document.querySelector('.btn-area button:nth-child(1)');
var motai = document.querySelector('.guan');
guanzhu.onclick = function () {
    // phone = sessionStorage.getItem("id");
    let guan = {
        'beattephone': dyone.userid,
        'phone': phone,
    };
    if (phone && phone != dyone.userid && guanzhu.innerHTML.trim() == "关注") {
        $.ajax({
            url: uurl+'user/guanzhuUser/',
            type: 'get',
            data: guan,
            dataType: 'json',
            success: function (res) {
                motai.innerHTML = '关注成功';
                guanzhu.innerHTML = '已关注'
            }
        });
    } else if (phone && phone != dyone.userid && guanzhu.innerHTML.trim() == "已关注") {
        $.ajax({
            url: uurl+'user/reguanzhuUser/',
            type: 'get',
            data: guan,
            dataType: 'json',
            success: function (res) {
                motai.innerHTML = '取消关注成功';
                guanzhu.innerHTML = '关注'
            }
        });
    } else {
        motai.innerHTML = '对不起,请先登录'
    }
};


let btnfabu1 = document.querySelector('.btnfabu');
let cont = document.querySelector('.cont');
// let firstcomment=
// btnfabu1.onclick = function () {
//
//     let text = {
//         'cont': cont.value,
//         'userphone': phone,
//         'dyid': dyid,
//     };
//     $.ajax({
//         url: 'http://127.0.0.1:8000/dynamic/setDynamicComm/',
//         type: 'post',
//         data: JSON.stringify(text),
//         success: function (res) {
//             res = JSON.parse(res);
//             if (res.code == '205') {
//                 uploadpic(allimgs)
//
//             }
//         },
//         error: function () {
//             swal(
//                 'error',
//                 ' ',
//                 'error',
//             );
//         }
//     })
// };
let allimgs = [];
$('#upload_file').on("change", function (e) {
    var file = e.target.files[0]; //获取图片资源
    allimgs.push(file);
    // 只选择图片文件
    if (!file.type.match('image.*')) {
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读取文件
    // 渲染文件
    reader.onload = function (arg) {
        document.querySelector('#preview').innerHTML +=
            `<div class="shangchuanwai" style="position: relative">
                <div class="shangchuanli">删除</div>
            <img src="${arg.target.result}"></div>
            `
    };

});

function uploadpic(allimgs) {
    $.ajax({
        url: uurl+'user/getimgtokens/',
        type: 'get',
        data: {'dyid': dyid, 'lens': allimgs.length},
        success: function (ress) {
            for (let i=0 ;i<ress.length;i++) {
                let res = ress[i];
                let file = allimgs[i];
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
                            '评论成功',
                            ' ',
                            'success',
                        );
                        cont.value = '';
                    }
                });
            }


        }
    })  //end ajax
}
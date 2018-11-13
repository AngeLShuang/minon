var count = 0;
var pageSize = 8;
var alllist = [];
$(function () {
    let condition=sessionStorage.getItem('condition');
    getdydata(condition)
});

//获取动态数据
function getdydata(condition) {
    let data={
        "condition":condition,
    }
    $.ajax({
        url: uurl+'dynamic/getdynamic/',
        type: 'get',
        data:data,
        success: function (res) {
            for (let i of JSON.parse(res)) {
                alllist.push(i);
            };
            showdydata(pageSize)
        }
    })
}

//加载更多
var btnmore = document.querySelector('.btnmore');
jiazaidengduo();
function jiazaidengduo() {
    btnmore.onclick = function () {
        count++;
        let end = pageSize * (count + 1);
        if (alllist.length - end >= 0) {
            showdydata(end)
        } else {
            showdydata(alllist.length)
            btnmore.innerHTML = `已经到底啦`
        }
    }
}

var dylist = document.querySelector('.dylist');
//展示动态数据
function showdydata(end) {
    dylist.innerHTML = ``;
    let dy;
    for (let i = 0; i < end; i++) {
        dy = alllist[i];
        title = dy.title;
        biaoti = title.length < 13 ? title : title.substr(0, 15) + '...';
        dylist.innerHTML += `
            <div class="col-sm-4 col-md-3 col-xs-12 itemc">
                <div class="thumbnail" id="${dy.id}">
                    <img src="${dy.picuture}" alt="${dy.title}" class="img-rounded imgpic">
                    <div class="xianshi" style="display: none">
                        <div class="mask">
                            <div class="mn-btn">
                                <input type="button" value="收集" class="btn-sample shouji" data-toggle="modal"
                                       data-target="#myModal">
                                <input type="button" value="点赞" name="dianzan" class=" btn-sample">
                                <input type="button" value="评论" name="pinglun" class=" btn-sample">
                            </div>
                        </div>
                    </div>
                    <!--点赞出现的效果-->
                    <div class="zan-appear"></div>
                    <div class="caption">
                        <h5>${biaoti}</h5>
                        <!--点赞 收藏-->
                        <div class="nav-cole">
                            <span class="glyphicon glyphicon-thumbs-up perfect" v-text="good">&nbsp;11</span>
                            <span class="glyphicon glyphicon-heart collect">&nbsp;2200</span>
                        </div>
                        <div class="user-info">
                            <div class="user-pic">
                                <a href="other_personalCenter.html">
                                    <img src="${dy.picture}" alt="" class="img-circle imghead">
                                </a>
                                <div class="user-intro" id="${dy.userid}">
                                    <p1>${dy.userNickname}</p1>
                                </div>
                                <p class="mn-fabu">
                                    发布时间 &nbsp;<span>${dy.time}</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="aaa">
                    <span class="piing">评论</span>
                    <textarea class="form-control" rows="3" placeholder="说些什么吧..."></textarea>
                    <a href="####" class="fasong">发送</a>
                    <a href="####" class="quxiao">取消</a>
                </div>
            </div>
        `
    }

}

//如果登录了就显示收藏样式
dylist.onmouseover = function (event) {
    let eve = event.target;
    if (eve.nodeName == "IMG" && eve.className == 'img-rounded imgpic') {
        let flag = sessionStorage.getItem('flag');
        if (flag) {
            var xianshi = eve.nextElementSibling;
            xianshi.style.display = 'block';
        }
    }
};

let ls;
//进去动态详情页
//进去他人的个人中心
dylist.onclick = function (event) {
    eve = event.target;
    ls=eve;
    var piing=document.querySelector('.piing');
    piing.innerHTML='评论';
    if (eve.nodeName == "IMG" && eve.className == 'img-rounded imgpic') {
        id1 = eve.parentNode.id;
        if (alllist) {
            for (let i of alllist) {
                if(i.id==id1){
                    sessionStorage.setItem("dynamicid",id1);
                    location.href='dynamics_Details.html';
                }
            }
        }else {
            location.href='404-page.html';
        }
    }else if(eve.nodeName =="P1"){
        sessionStorage.setItem("yoursid",eve.parentNode.id);
        location.href='other_personalCenter.html';
    }else if (eve.nodeName == "IMG" && eve.className == 'img-circle imghead') {
        sessionStorage.setItem("yoursid",eve.parentNode.nextElementSibling.id);
    }else if(eve.nodeName=='A' && eve.className=='quxiao'){
        //评论
        eve.previousElementSibling.previousElementSibling.value='';
        eve.parentElement.style.display='none';
    }else if(eve.nodeName=='A' && eve.className=='fasong'){
        //评论
        let comment={
            "dynamicid_id":eve.parentElement.previousElementSibling.id,
            "firstcomment_id":"",
            "userphone_id":sessionStorage.getItem('id'),
            "content":eve.previousElementSibling.value,
            "pictures":[]
        };
        addComment(comment);

    }
};

//添加评论
function addComment(comment){
    $.ajax({
        url: uurl+'dynamic/setDynamicCommyuan/',
        type: 'post',
        data:JSON.stringify(comment),
        success: function (res) {
            res=JSON.parse(res);
            if(res['code']=='205'){
                ls.previousElementSibling.previousElementSibling.innerHTML='评论成功'
            }else {
                ls.previousElementSibling.previousElementSibling.innerHTML='评论失败'
            }

        }
    })
}


yangshi();

function yangshi() {
    let allshuju = $('.container.alllist');
    let thispinglun;
    let allitems;
    allshuju.click(function (event) {
        thispinglun = $(event.target).parents('.thumbnail').next();
        if ($(event.target).attr('name') == 'pinglun') {
            allitems = document.querySelectorAll('.aaa');
            for (let i of allitems) {
                $(i).hide(500);
            }
            if (thispinglun.css('display') == 'none') {
                thispinglun.show(400);
            } else {
                thispinglun.hide(400);
            }


        } else if ($(event.target).attr('name') == 'dianzan') {

            $(event.target).parent().parent().parent().next().fadeIn(1000);
            $(event.target).parent().parent().parent().next().fadeOut(1000);
        }
    })
    ;
}



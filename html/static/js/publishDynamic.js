//发布动态
let btnpublish = document.querySelector('.dy-update');

let temp;
// let delid;
let dyid = sessionStorage.getItem('dyid');
if (dyid) {
    // alert(dyid);
    btnpublish.value = "修改";
    userDynamic(dyid);
}

let cbname = document.querySelector('.cbname');
let biaoqian = document.querySelector('.bordnone');
let simditor = document.querySelector('#simditor');
let xianshi = document.querySelector('.dy-header h2');
btnpublish.onclick = function () {
    if (btnpublish.value.trim() == "发布") {
        if (cbname.value != '') {
            let spall = document.querySelectorAll('.sp');
            let splist = [];
            for (let s of spall) {
                splist.push(s.innerHTML);
            }
            let dynamic = {
                "title": cbname.value,
                "picuture": '',
                "content": simditor.value,
                "userphone": sessionStorage.getItem("id"),
                "label": splist
            };
            adddynamic(dynamic);
        } else {
            xianshi.innerHTML = '请填写标题';
        }
    } else if (btnpublish.value.trim() == "再发一篇") {
        location.href = 'publishDynamic.html'

    } else if (btnpublish.value.trim() == "修改") {
        let neirong = document.querySelectorAll('.sp');
        let splist = [];
        for (let s of neirong) {
            if (s.innerHTML) {
                splist.push(s.innerHTML);
            }
        }
        // console.log(splist);
        temp = {
            "id": sessionStorage.getItem('dyid'),
            "picuture": '',
            "content": simditor.value,
            "title": cbname.value,
            "label": splist,
        };
        updatadynamic(temp)

    }
};

function adddynamic(dynamic) {
    $.ajax({
        url: uurl+'dynamic/publishDynamic/',
        type: 'post',
        data: JSON.stringify(dynamic),
        success: function (res) {
            res = JSON.parse(res);
            if (res['code'] == '205') {
                btnpublish.value = '再发一篇';
                xianshi.innerHTML = '发布成功';
                cbname.disabled = "disabled";
                biaoqian.disabled = "disabled";
                simditor.disabled = "disabled";
            } else {
                document.querySelector('.dy-header h2').innerHTML = '发布失败,请重试';
            }

        }
    })
}

//当用户点击修改时候渲染在页面上的数据
function userDynamic(dynamicid) {
    $.ajax({
        url: uurl+'dynamic/getUserDynam/',
        type: 'GET',
        data: {'dynamicid': dynamicid},
        success: function (res) {
            re = JSON.parse(res);
            $(".cbname").val(re['contents']['title']);
            $("#simditor").val(re['contents']['content']);


            //显示标签的内容
            for (let ro of re['labels']) {
                addsmallFlag.innerHTML += `
            <div class="bordergrey sh f">#<span class="sp" id="${ro['id']}">${ro['label']}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>
            `
            }


            //    点击x删除标签
            addsmallFlag.onclick = function (event) {
                if (event.target.nodeName == 'SPAN' && event.target.className == 'glyphicon glyphicon-remove-sign cross') {

                    event.target.previousElementSibling.innerHTML = '';
                    event.target.parentElement.style.display = 'none';
                    delname = event.target.parentElement.firstElementChild.innerHTML;
                }
            }
        }
    })
}

function updatadynamic() {
    $.ajax({
        url: uurl+'dynamic/updateUserDynamic/',
        type: 'POST',
        data: JSON.stringify(temp),
        success: function (res) {
            if (res && res['code'] == 800) {
                xianshi.innerHTML = '修改成功';
                setTimeout(function () {
                    location.href = 'personalCenter.html';
                }, 1000);

            }
        }

    })

}
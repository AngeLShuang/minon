let dynamiclist = document.querySelector('.perdy');

function getmydynamic(){
        $.ajax({
            url:uurl+'dynamic/getUserDynamic/',
            type:'get',
            data:{'userphone':id},
            success:function (res) {
                res=JSON.parse(res);
                //渲染document.querySelector('.embed-responsive-item').contentWindow.
                showdylist(res);
                if(yoursid && my!=yoursid){
                    hideedit();
             }
            },
            error:function () {
                console.log('404');
            }
        })

    }
    id=window.parent.showid();
    yoursid=window.parent.yourss();
    my=window.parent.mymy();
    getmydynamic();
function showdylist(res) {
    dynamiclist.innerHTML = ``;
    for (let i of res) {
        if (i.content.length >= 80) {
            i.content = i.content.slice(0, 80) + '...'
        }
        dynamiclist.innerHTML += `
            <div class="row selfdy" id="${i.id}">
            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"><a href="####" "><img src="../static/image/zpicon.gif"></a></div>
            <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                <div class="yy">
                    <a href="####" ">
                        <div class="yycon">
                            <p>${i.content}</p>
                           </div>
                        <div class="yycpimg">
                            <img src="${i.picuture}">
                        </div>
                    </a>
                </div>
                <div class="time">
                   ${i.time}
                </div>
            </div>
        </div>
        <div>
           <div class="del-box">
               <span class="deletedy" style="float: right;color: #d9a501;font-size: 14px;cursor: pointer;margin-right: 5px;">删除</span>
               <span class="updatedy" style="float: right;color: #dba301;font-size: 14px;cursor: pointer;margin-right: 5px;">修改</span>
            </div>
        </div>
        `

    }
}


dynamiclist.onclick = function (event) {
    for (let i of $(event.target).parents('div')) {
        if ('row selfdy' == i.className) {
            sessionStorage.setItem('dynamicid', i.id);
            parent.window.location.href = 'dynamics_Details.html';
            break
        }
    }
    if (event.target.nodeName == 'SPAN' && event.target.className == 'deletedy') {
        sessionStorage.setItem('dyid', event.target.parentElement.previousElementSibling.id);
        dyid = sessionStorage.getItem('dyid');
        delmydynamic(dyid);
    } else if (event.target.nodeName == 'SPAN' && event.target.className == 'updatedy') {
        sessionStorage.setItem('dyid', event.target.parentElement.previousElementSibling.id);
        parent.window.location.href = 'publishDynamic.html';
    }

};

// 删除操作
let edits = document.querySelectorAll('.del-box');

function hideedit() {
    let edits = document.querySelectorAll('.del-box');
    for (let i of edits) {
        i.style.display = 'none'
    }
}

//这里是根据动态Id删除这条动态
function delmydynamic(dynamicid) {
    swal({
        title: '确定删除吗？',
        text: '你将无法恢复它！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定删除！',
        cancelButtonText: '取消删除！',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            $.ajax({
                url: uurl+'dynamic/delUserDynamic/',
                type: 'get',
                data: {'dynamicid': dynamicid},
                success: function (res) {
                    if (res['code'] == '203') {
                        swal(
                            '删除成功',
                            '',
                            'success'
                        )
                        getmydynamic()
                    }
                }

            })
        } else if (dismiss.dismiss === 'cancel') {
            swal(
                '已取消！',

                'error'
            );
        }


    })
}
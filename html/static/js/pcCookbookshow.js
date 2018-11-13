let cookbooklist = document.querySelector('.container-fluid.cblist .cblists');

function getmycookbook(id) {
        $.ajax({
            url:uurl+'user/getUserCookbook/',
            type:'get',
            data:{'userphone':id},
            success:function (res) {
                res=JSON.parse(res);
                //渲染document.querySelector('.embed-responsive-item').contentWindow.
                // document.querySelector('.embed-responsive-item').contentWindow.
                showcblist(res);
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
getmycookbook(id);
function showcblist(res) {
    cookbooklist.innerHTML = ``;
    for (let i of res) {
        cookbooklist.innerHTML += `
             <div class="cbl" id="${i.baseid}">
            <div class="img">
                <a href="#" title="${i.baseid__cookbookname}" class="img" ><img alt="${i.baseid__cookbookname}" src="${i.baseid__cookbookpictures}"></a>
                <strong class="gx"><span>${i.efficacyone}</span></strong>
            </div>
            <div class="info">
                <a  title="${i.baseid__cookbookname}" class="img" ></a>
                <div class="infoc">
                    <a  title="${i.baseid__cookbookname}" class="linkcb" >
                        <ul>
                            <li class="gy">${i.baseid__belongto}</li>
                            <li class="kw">${i.tasteid__tastelabel}</li>
                            <li class="nd">${i.styleid__stylename}</li>
                        </ul>
                    </a>
                    <div class="gx2">
                        <span>${i.efficacy}</span>
                    </div>
                </div>
            </div>
            <div class="infoma">
                <h3>
                    <a  title="${i.baseid__cookbookname}">
                        ${i.baseid__cookbookname}
                    </a>
                </h3>
                <div class="d1">
                    <span>1 评论</span>
                    <span>5033 浏览</span>
                </div>
                <a class="author" href="#" >
                   ${i.userphone__userinform__usernickname}
                </a>
                <div class="del-box">
                    <a href="" class="redact-cookbook" >编辑</a>
                    <a href="" class="del-cookbook" data-toggle="modal" data-target="#myModal">
                        删除
                    </a>
                    <div class="modal-box">
                        <div>

                        </div>
                    </div>
                    <!-- Modal -->
                    <!--<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">-->
                        <!--<div class="modal-dialog" role="document">-->
                            <!--<div class="modal-content">-->
                                <!--<div class="modal-header">-->
                                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                                        <!--<span aria-hidden="true">&times;</span>-->
                                    <!--</button>-->
                                    <!--<h4 class="modal-title" id="myModalLabel">-->
                                        <!--确定删除该菜谱？</h4>-->
                                <!--</div>-->
                                <!--<div class="modal-footer">-->
                                    <!--<button type="button" class="btn btn-default queding" data-dismiss="modal">-->
                                        <!--确定-->
                                    <!--</button>-->
                                    <!--<button type="button" class="btn btn-primary" data-dismiss="modal">取消-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->

                </div>
            </div>
        </div>
        `
    }

}


let getid;
let thisfood;
cookbooklist.onclick = function (event) {
    for (let i of $(event.target).parents('div')) {
        if ('cbl' === i.className) {
            if ("redact-cookbook" === event.target.className) {
                getid = i.id;
                sessionStorage.setItem('bianji', getid);
                parent.location.href = 'cookBook.html'
            } else if ("del-cookbook" === event.target.className) {
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
                    if(dismiss.value){
                        thisfood = $(event.target).parents('.cbl');
                        getid = i.id;
                        ajaxdelshuju()
                    }else if (dismiss.dismiss === 'cancel') {
                        swal(
                            '已取消！',
                            'error'
                        );
                    }
                })
            } else {
                sessionStorage.setItem('nowfood', i.id);
                sessionStorage.setItem('heuserphone', sessionStorage.getItem('id'));
                parent.window.location.href = 'xiangqing.html';
            }
        }
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


function ajaxdelshuju() {
    $.ajax({
        type: 'get',
        url: uurl+"user/delCaipu",
        data: {'getid': getid},
        success: function (res) {
            thisfood.css('display', 'none');
            swal(
                '删除成功',
                '',
                'success'
            )
        },
        error: function () {
            console.log('删除失败');
        },
    });
}

//====end====

// 编辑操作


// 渲染发布菜谱页面



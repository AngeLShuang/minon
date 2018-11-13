let collect =document.querySelector('.caipu-collect .collect');
let collecttext =document.querySelector('.caipu-collect .collect .c');
let id=sessionStorage.getItem('id');
let collnum=document.querySelector('.caipu-collect .collect .n');
let uploaduu=document.querySelector('.upload-user.change');
$.ajax({
        url:uurl+'cookbook/cookbookbrowl/',
        type:'get',
        data:{'id':id,'nowfood':nowfood},
        success:function (res) {
            console.log(res);
        },
        error:function () {
            console.log('404');
        }
});

collect.onclick=function () {
    if(id){
        $.ajax({
      url:uurl+'cookbook/collectCk/',
      type:'get',
      data:{'nowfood':nowfood,'id':id,'coll_not':collectbtn.innerHTML},
      success:function (res) {
          res=JSON.parse(res);
          if(res.code=='230'){
              collecttext.innerHTML='已收藏';
              collnum.innerHTML=parseInt(collnum.innerHTML)+1;
                swal(
                  '收藏成功！',
                  '   ',
                  'success'
                )
          }else if(res.code=='231'){
              collecttext.innerHTML='收藏';
              collnum.innerHTML=parseInt(collnum.innerHTML)-1;
                swal(
                  '取消收藏成功！',
                  '   ',
                  'success'
                )
          }else{
              swal(
              'error！',
              '您已收藏',
              'error'
            )
          }
      },
      error:function () {
          console.log('404');
      }
  })
    }else{
        swal(
              '请先登录！',
              '   ',
              'error'
            )
        // window.location.href='index2.html'
    }

};

$.ajax({
   url:uurl+'user/getCookBookUser/',
    type:'get',
    data:{'nowfood':nowfood},
    success:function (res) {
        res=JSON.parse(res);
        if(res.code=='230'){
            uploaduu.innerHTML=`
                            <div id="${res.ph}" class="item" style="display: flex;justify-content: space-between">
                            <div class="upload-img">
                                <img src="${res.headportraitid__picture}" alt="">
                            </div>
                            <div class="upload-message">
                                    <span>
                                        <a class="usernickname">${res.usernickname}</a>
                                    </span>
                                <span>
                                        <a  name="caipu">菜谱：${res.cnum}</a>　/　
                                    <a class="guanzhunum"><span>关注：${res.guanzhu}</span></a>
                                    　/　
                                    <a class="fansnum"><span>粉丝：${res.fans}</span></a>
                                    </span>
                                <span>
                                        <span>${res.cookbooktime}　/　</span>
                                        <span>${res.browl} 人看过</span>
                                    </span>
                            </div>
</div>
            `
        }else{
            console.log('err');
        }
    },
    error:function () {
        console.log('404');
    }
});

uploaduu.onclick=function () {
    sessionStorage.setItem('yoursid',this.firstElementChild.id);
    window.location.href='personalCenter.html'
};


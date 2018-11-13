let clickfood=document.querySelector('.snack_list');
let nowfood,nowuserphone;
clickfood.onclick=function (event) {
    if($(event.target).parents('.cbl').attr('class')=='cbl'){
        if($(event.target).parent().attr('class')!='usermessage' && $(event.target).parent().attr('class')!='d1'){
            nowfood=$(event.target).parents('.cbl').attr('id');
            nowuserphone=$(event.target).parents('.cbl').find('.usermessage').attr('name');
            sessionStorage.setItem('nowfood',nowfood);
            sessionStorage.setItem('heuserphone',nowuserphone);
            window.location.href='xiangqing.html';
        }else{
            sessionStorage.setItem('heuserphone',$(event.target).parents('.usermessage').attr('name'));
            sessionStorage.setItem('yoursid',$(event.target).parents('.usermessage').attr('name'));
            window.location.href='personalCenter.html';
        }

  }
};
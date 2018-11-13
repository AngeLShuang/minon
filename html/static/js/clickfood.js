$('.snack_list .snack_ul').click(function (event) {
    let thisid=$(event.target.parentNode).attr('id');
    if(thisid){
    }else {
        thisid=$(event.target.parentNode.parentNode).attr('id');
    }
    sessionStorage.setItem('clickid', thisid);
    location.href = 'xiangqing.html'
    });
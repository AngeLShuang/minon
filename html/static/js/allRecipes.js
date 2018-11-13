$('.cbchoose .p').click(function () {
    $('.cbfood .putong').show();
    $('.cbfood .shicai').hide();
    $('.cbchoose .s').css('background', 'white');
    $('.cbchoose .s').css('color', '#9b9b9b');
    $('.cbchoose .p').css('background', '#9b9b9b');
    $('.cbchoose .p').css('color', 'white');
});

$('.cbchoose .s').click(function () {
    $('.cbfood .putong').hide();
    $('.cbfood .shicai').show();
    $('.cbchoose .s').css('background', '#9b9b9b');
    $('.cbchoose .s').css('color', 'white');
    $('.cbchoose .p').css('background', 'white');
    $('.cbchoose .p').css('color', '#9b9b9b');
});

$('.putong ul li .t').click(function () {
    if ($(this).next().css('display') != 'none') {
        $(this).next().hide(200);

    } else {
        $(this).next().show(200);
        $(this).next().css('display', 'flex')
    }
});
let i = true;
$('.putong').click(function (event) {

    if (event.target.className == 'k m' || event.target.className == 'k') {
        if (event.target.className == 'k') {
            i = false;
            $(event.target).addClass('m');
            $(event.target).children().css('background', '#949494');
            $(event.target).children().css('left', '91%');
            $(event.target).children().css('top', '66%');
            $(event.target).css('border', '1px solid #949494')
        } else {
            i = true;
            $(event.target).removeClass('m');
            $(event.target).children().css('background', 'white');
            $(event.target).children().css('left', '86%');
            $(event.target).children().css('top', '65%');
            $(event.target).css('border', '1px solid #d0d0d0')
        }
    }
});

//添加标签
var addsmallFlag = document.querySelector('.addsmallFlag .col-lg-12');
var flagWarning = document.querySelector('.flagWarning');


addLabel();

function addLabel() {
    let a = document.querySelector('.add-flag .flag-text .form-control a');

    a.onclick = function () {
        flagWarning.innerHTML = '';
        let input = document.querySelector('.add-flag .flag-text .form-control input');
        if (input.value) {
            let flag = document.querySelectorAll('.sp');
            let panduan=true;
            if (flag.length) {
                for (let f of flag) {
                    if (f.innerHTML == input.value) {
                        flagWarning.innerHTML = `对不起,您已添加过该标签`;
                        panduan=false;
                        break;
                    }
                }
                if(panduan){
                    addsmallFlag.innerHTML += `
            <div class="bordergrey sh f">#<span class="sp">${input.value}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>
            
        `
                }
            } else {
                addsmallFlag.innerHTML += `
                <div class="bordergrey sh f">#<span class="sp">${input.value}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>            
                `
            }
        } else {
            flagWarning.innerHTML = `对不起,不能输入空标签,请填写内容`
        }
        input.value='';
    }
}


addsmallFlag.onclick = function (event) {
    eve = event.target;
    if (eve.nodeName == 'SPAN') {
        eve.parentElement.style.display = 'none';
        eve.parentElement.innerText = '';

    }
};

//上传成品图
$(function () {
    $('.up-input input').change(function () {
        var file = $('.up-input input').get(0).files[0];
        $('.delepic').css('opacity', '1');
        $('.showPic').removeAttr('style');
        $('.showPic').addClass('displaynblock');
        $('.delepic').addClass('displaynblock');
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            console.log(e);
            $('.showPic').get(0).src = e.target["result"];
        }
    })

});


//删除成品图
$(function () {
    let img = $('.imge');
    let del = $('.delepic');
    del.click(function () {
        img.attr('src', '');
        img.css('height','20px');
        del.css('opacity', '0');
    })
});
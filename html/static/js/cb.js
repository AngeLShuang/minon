//添加原材料div
$(function () {
    $('.raw-material').click(function () {
        $('.material').slideToggle();
    });
});

//添加步骤div
$(function () {
    $('.allstep').click(function () {
        $('.step').slideToggle();
    })
});

//添加属性下拉框
showDrop();

function showDrop() {
    let aregion = document.querySelectorAll(".labelregion");
    for (let a of aregion) {
        let region = a.children[1];
        a.onmouseover = function () {
            region.style.display = "block";
        };
        a.onmouseleave = function () {
            region.style.display = "none";
        }
    }
}

//添加一项原材料
addmater();

function addmater() {
    let materbutton = document.querySelector(".btn1");
    let fubutton = document.querySelector(".btn2");
    fubutton.onclick = function () {
        let fumater = document.querySelectorAll('.accessories .fu');
        let fuliao = [];
        let fuliaokeshu = [];
        for (let m of fumater) {
            if (m) {
                fuliao.push(m.children[0].children[0].value);
                fuliaokeshu.push(m.children[1].children[0].value);
            }
        }
        fubutton.parentElement.previousElementSibling.children[0].innerHTML += `
                <div class="namemater f fu">
                    <div class="namemater f">
                         <input type="email" class="form-control pore" placeholder="请填写食材名称">
                    </div>
                    <div class="consumater f">
                         <input type="email" class="form-control pore" placeholder="请填写用量">
                    </div>
                    <div class="picmater marginten f">
                         <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                    </div>
                </div>
                `
        let main = document.querySelectorAll('.accessories .fu');
        let nn = 0;
        let mm = 0;
        for (let j of fuliao) {
            if (j) {
                main[nn].children[0].children[0].value = j;
                nn++;
            }
        }
        for (let m of fuliaokeshu) {
            if (m) {
                main[mm].children[1].children[0].value = m;
                mm++;
            }
        }
    }
    materbutton.onclick = function () {
        let mainmater = document.querySelectorAll('.mainmater .zhu');
        let zhuliao = [];
        let zhuliaokeshu = [];
        for (let m of mainmater) {
            if (m) {
                zhuliao.push(m.children[0].children[0].value);
                zhuliaokeshu.push(m.children[1].children[0].value);
            }
        }
        materbutton.parentElement.previousElementSibling.children[0].innerHTML += `
                <div class="namemater f zhu">
                    <div class="namemater f">
                         <input type="email" class="form-control pore" placeholder="请填写食材名称">
                    </div>
                    <div class="consumater f">
                         <input type="email" class="form-control pore" placeholder="请填写用量">
                    </div>
                    <div class="picmater marginten f">
                         <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                    </div>
                </div>
                `
        let main = document.querySelectorAll('.mainmater .zhu');
        let nn = 0;
        let mm = 0;
        for (let j of zhuliao) {
            if (j) {
                main[nn].children[0].children[0].value = j;
                nn++;
            }
        }
        for (let m of zhuliaokeshu) {
            if (m) {
                main[mm].children[1].children[0].value = m;
                mm++;
            }
        }
    }

}

//添加原材料的小叉叉悬停点击事件
cross();

function cross() {
    //主料
    let mainmater = document.querySelector(".mainmater");
    mainmater.onclick = function (event) {
        eve = event.target;
        if (eve.nodeName == 'SPAN') {
            eve.parentElement.previousElementSibling.children[0].value = '';
            eve.parentElement.previousElementSibling.previousElementSibling.children[0].value = '';
            eve.parentElement.parentElement.style.display = 'none';
        }
    };
    //辅料
    let accessories = document.querySelector(".accessories");
    accessories.onclick = function (event) {
        eve = event.target;
        if (eve.nodeName == 'SPAN') {
            eve.parentElement.previousElementSibling.children[0].value = '';
            eve.parentElement.previousElementSibling.previousElementSibling.children[0].value = '';
            eve.parentElement.parentElement.style.display = 'none';
        }
    };

}

//显示下拉框数据
dropData();

function dropData() {
    let allAttribute = document.querySelector('.allattribute');
    allAttribute.onchange = function (event) {
        att = event.target;
        if (att.nodeName == 'SELECT') {
            let selectValue = att.options[att.selectedIndex].value;
            att.previousElementSibling.innerHTML = selectValue;
            att.style.display = 'none';
        }
    }
}

//显示标题提示
tip();

function tip() {
    let tip = document.querySelector('.tip');
    let cbname = document.querySelector('.cbname');
    cbname.onfocus = function () {
        tip.style.display = 'block';
    };
    cbname.onblur = function () {
        tip.style.display = 'none';
    }
}

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
            let panduan = true;
            if (flag.length) {
                for (let f of flag) {
                    if (f.innerHTML == input.value) {
                        flagWarning.innerHTML = `对不起,您已添加过该标签`;
                        panduan = false;
                        break;
                    }
                }
                if (panduan) {
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
        input.value = '';
    }
}


addsmallFlag.onclick = function (event) {
    eve = event.target;
    if (eve.nodeName == 'SPAN') {
        eve.parentElement.style.display = 'none';
        eve.parentElement.innerText = '';

    }
};

//添加功效
var addsmallEfficacy = document.querySelector('.addsmallEfficacy .col-lg-12');
var efficacyWarning = document.querySelector('.efficacyWarning');

addEfficacy();

function addEfficacy() {
    let a = document.querySelector('.picE');

    a.onclick = function () {
        efficacyWarning.innerHTML = '';
        let input = document.querySelector('.inputE');
        if (input.value) {
            let flag = document.querySelectorAll('.sp1');
            let panduan = true;
            if (flag.length) {
                for (let f of flag) {
                    if (f.innerHTML == input.value) {
                        efficacyWarning.innerHTML = `对不起,您已添加过该功效`;
                        panduan = false;
                        break;
                    }
                }
                if (panduan) {
                    addsmallEfficacy.innerHTML += `
            <div class="bordergrey sh f">#<span class="sp1">${input.value}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>
            
        `
                }
            } else {
                addsmallEfficacy.innerHTML += `
                <div class="bordergrey sh f">#<span class="sp1">${input.value}</span>#<span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span></div>            
                `
            }
        } else {
            efficacyWarning.innerHTML = `对不起,功效不能为空,请填写内容`
        }
        input.value = '';
    }
}

addsmallEfficacy.onclick = function (event) {
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
    let del = $('.delepic')
    del.click(function () {
        img.attr('src', '');
        del.css('opacity', '0');
    })
});

var i = 1;    //当前步骤
var stepdiv = document.querySelector('.stepdiv');
$( function () {
    for (let j = 1; j < 4; j++) {
        stepdiv.innerHTML += `
        <div class="margint of">
            <div class="text-center h3 numstep h f">${j}.</div>
            <div class="picstep hidden-xs hidden-sm f">
                <ul class="dy-ul-list">
                    <div class="upload-pics">
                        <a href="####" class="dy-upload-a">
                            <i class="dy-i"></i>
                            <span class="dy-up-span">上传</span>
                            <div class="up-input">
                               <input type="file"
                                              style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"
                                              multiple=""
                                              accept="image/jpeg,.jpg,image/png,.png,.jpeg,image/gif,.gif,image/bmp,.bmp,.JPG,.PNG,.JPEG,.GIF,.BMP,application/pdf,.pdf,image/tiff,.tiff">
                            </div>
                         </a>
                    </div>
                </ul>
                                    <!--<img src="image/head.jpg" style="width: 100px;height: 100px; object-fit: cover;">-->
            </div>
            <div class="desstep f">
                <textarea name="te" class="h mutext"></textarea>
             </div>
                                <div class="cdstep f">
                                    <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-upload cross ba" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-download cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-plus-sign cross" aria-hidden="true"></span>
                                </div>
                            </div>
        `
    }
});

function showStep(data) {
    stepdiv.innerHTML = '';
    for (let j = 1; j <= data.length; j++) {
        stepdiv.innerHTML += `
        <div class="margint of">
                                <div class="text-center h3 numstep h f">${j}.</div>
                                <div class="picstep hidden-xs hidden-sm f">
                                    <ul class="dy-ul-list">
                                        <div class="upload-pics">
                                            <a href="####" class="dy-upload-a">
                                                <i class="dy-i"></i>
                                                <span class="dy-up-span">上传</span>
                                                <div class="up-input">
                                                    <input type="file"
                                                           style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"
                                                           multiple=""
                                                           accept="image/jpeg,.jpg,image/png,.png,.jpeg,image/gif,.gif,image/bmp,.bmp,.JPG,.PNG,.JPEG,.GIF,.BMP,application/pdf,.pdf,image/tiff,.tiff">
                                                </div>
                                            </a>
                                        </div>
                                    </ul>
                                    <!--<img src="image/head.jpg" style="width: 100px;height: 100px; object-fit: cover;">-->
                                </div>
                                <div class="desstep f">
                                    <textarea name="te" class="h mutext">${data[j - 1]}</textarea>
                                </div>
                                <div class="cdstep f">
                                    <span class="glyphicon glyphicon-remove-sign cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-upload cross ba" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-download cross" aria-hidden="true"></span>
                                    <span class="glyphicon glyphicon-plus-sign cross" aria-hidden="true"></span>
                                </div>
                            </div>
        `
    }
}

//四个小按钮的显示事件
fourButton();
var alertStep = document.querySelector('.alertStep');

function fourButton() {
    stepdiv.onclick = function (event) {
        let eve = event.target;
        let eveNode = eve.nodeName;
        let eveClass = eve.className;

        if (eveNode == 'SPAN') {
            if (eveClass == 'glyphicon glyphicon-remove-sign cross') {
                let ep = eve.parentElement.parentElement;  //当前步骤的玻璃片
                ep.children[2].children[0].value = '';
                while (ep.hasChildNodes()) //当ep下还存在子节点时 循环继续 直至删除全部
                {
                    ep.removeChild(ep.firstChild);
                }
                let text = document.querySelectorAll(".mutext");
                let textAll = [];
                for (let t of text) {
                    textAll.push(t.value)
                }
                showStep(textAll);
            } else if (eveClass == 'glyphicon glyphicon-upload cross ba') {
                let epup = eve.parentElement.parentElement;  //当前步骤的玻璃片
                let id = parseInt(epup.children[0].innerHTML.split('.')[0]);
                let text = document.querySelectorAll(".mutext");
                let textAll = [];
                for (let t of text) {
                    textAll.push(t.value)
                }
                if (id != 1) {
                    let temp = textAll[id - 2];
                    textAll[id - 2] = textAll[id - 1];
                    textAll[id - 1] = temp;
                    showStep(textAll)
                } else {
                    alertStep.innerHTML = `
                        <center>对不起,这是第一步,请往下续写步骤</center>
                    `
                }
            } else if (eveClass == 'glyphicon glyphicon-download cross') {
                let epdown = eve.parentElement.parentElement;  //当前步骤的玻璃片
                let id = parseInt(epdown.children[0].innerHTML.split('.')[0]);
                let text = document.querySelectorAll(".mutext");
                let textAll = [];
                for (let t of text) {
                    textAll.push(t.value)
                }
                if (id < textAll.length) {
                    let temp = textAll[id];
                    textAll[id] = textAll[id - 1];
                    textAll[id - 1] = temp;
                } else {
                    alertStep.innerHTML = `
                        <center>对不起,已是最后一步,请按"添加一步"续写步骤</center>
                    `
                }
                showStep(textAll)
            } else if (eveClass == 'glyphicon glyphicon-plus-sign cross') {
                let epdown = eve.parentElement.parentElement;  //当前步骤的玻璃片
                let id = parseInt(epdown.children[0].innerHTML.split('.')[0]);
                let text = document.querySelectorAll(".mutext");
                let textAll = [];
                for (let t of text) {
                    textAll.push(t.value)
                }
                textAll[id] = '';
                let textfu = textAll;
                for (let j = id + 1; j <= text.length; j++) {
                    textAll[j] = textfu[j - 1];
                }
                showStep(textAll);
            }
        }
    }
}

//添加一步按钮
addOneStep();

function addOneStep() {
    let addBtn = document.querySelector('.addOneStep');
    addBtn.onclick = function () {
        let text = document.querySelectorAll(".mutext");
        let textAll = [];
        for (let t of text) {
            textAll.push(t.value)
        }
        textAll[textAll.length] = '';
        showStep(textAll);
    }
}
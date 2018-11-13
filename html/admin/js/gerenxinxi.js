let one=$('.left-one');
let two=$('.left-two');
let three=$('.left-three');
let four=$('.left-four');
let all=$('.right-content ul');
let xinxi;
one.click(clickone);
two.click(clicktwo);
three.click(clickthree);
four.click(clickfour);
$(function () {
    //获得数据
    xinxi=parent.setperson();
    // console.log(xinxi);
    $('.right-first').html(
                jibenxinxi()
            )
});

function clickone(event) {
    console.log($(event.target));
    for(let i of all){
        $(i).css('display','none');
        if($(event.target).attr('class')=='left-one'){
            $('.right-first').css('display','block');
            $('.right-first').html(
                jibenxinxi()
            );
        }
    }
}


function clicktwo(event) {
    for(let i of all){
        $(i).css('display','none');
        if($(event.target).attr('class')=='left-two'){
            $('.right-two').css('display','block');
            $('.right-two').html(
                xiangxixinxi()
            );
        }
    }
}

function clickthree(event) {
    for(let i of all){
        $(i).css('display','none');
        if($(event.target).attr('class')=='left-three'){
            $('.right-three').css('display','block');

        }
    }
}

function clickfour(event) {
    for(let i of all){
        $(i).css('display','none');
        if($(event.target).attr('class')=='left-four'){
            $('.right-four').css('display','block');
            $('.right-four').html(
                '☆'
            );
        }
    }
}


//基本信息模板
function jibenxinxi() {
     let res=`
                        <li>基本信息</li>
                <li style="margin-left: 26px;">
                        <span class="telephone">用户名: <b>${xinxi['telephone']}</b> <button>修改</button></span>
    
                </li>
                <li style="margin-left: 26px;">
                    <span class="userNickname">昵称: <b>${xinxi['userNickname']}</b> <button>修改</button></span>
                    <span class="userSex">性别: <b>${xinxi['userSex']}</b> <button>修改</button></span>
                </li>
                <li style="margin-left: 26px;">
                    <span class="userEmail">邮箱: <b>${xinxi['userEmail']}</b> <button>修改</button></span>
                </li>
                `;
    return res
}
//详细信息模板
function xiangxixinxi() {
    // console.log(xinxi);
    let res=`
        <li>详细信息</li>
            <li>
                <span class="userBriday">
                    生日 <b>${xinxi['userBriday']}</b> <button>修改</button>
                </span>
                <span class="occupation">
                    职业 <b>${xinxi['occupation']}</b> <button>修改</button>
                </span>
            </li>
            <li>
                <span class="adress">
                    地址：
                    <span>${xinxi['userProvince']}省 ${xinxi['userCity']}市</span> <button>修改</button>
                </span>
            </li>

            <li>
                <span class="signature">
                    签名:
                    <span>
                        ${xinxi['signature']}
                    </span>
                    <button>修改</button>
                </span>
            </li>
    `;
    return res
}



//模态框
let wenben,inputkuang;
$('.right-content').click(function (event) {
    if(event.target.nodeName=='BUTTON'){
        parent.$(".motaikuang").css('display','block');

        // console.log($(event.target.previousElementSibling));
        inputkuang=$(event.target.previousElementSibling);
        if(inputkuang.parent().attr('class')=='userBriday'){
                parent.$('.change').attr('type','date');
        }else{
            parent.$('.change').attr('type','text');
        }
        (parent.$('.change')).focus();
        wenben=inputkuang.text();
        // console.log(inputkuang);
        parent.$('.change').attr('placeholder',wenben);
    }
});
function getinput() {
    return inputkuang
}




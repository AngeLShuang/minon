// ==========按口味儿筛选==============
// 第一步 把数据库口味取出来 渲染上去
// 第二步 点击口味  取到口味 放入数组  let
// 第三步 lingshi 对比口味
// 符合的 放入 xin  --> linshi
// 重新调用 所有的方法 --> getpage  shoupage shouindex

// 第一步获取口味儿数据
let alltaste = [];
$.ajax({
    url: uurl+'cookbook/gettaste/',
    type: 'get',
    data: null,
    success: function (res) {
        res = JSON.parse(res);
        for (let i of res) {
            alltaste.push(i);
        }
    },
    error: function () {
        console.log('402');
    }
});

// 第二步渲染口味儿数据
let advertisement = document.querySelector('.j');
var putong = document.querySelector('.t');
putong.onclick = function () {
    showtaste(alltaste)
};

function showtaste(res) {
    advertisement.innerHTML = ``;
    let kw;
    for (let i of res) {
        kw = i;
        if(kw.trim()){
            advertisement.innerHTML += `
        <span class="k">${kw}
        <span>√</span>
        </span>
        
        `;
        }
    }
}

// 给每一个点击的口味一个点击事件
let allkwsj=[];
let okw;
var kw;
let indexx=1;
let jh=1;

// let allshic=[]
$(function () {
    advertisement.onclick = function (event) {
        let alldui=document.querySelectorAll('.k > span');
        for(let i of alldui){
            if(i.parentElement.className=='k m'){
                i.style.display='none'
            }else{
                i.style.display='block'
            }
        }
        if (event.target.className == 'k' || event.target.className == 'k m' ) {
            if(event.target.className == 'k'){
                okw=event.target.innerText.substring(0, 3)
            }else{
                okw=''
            }
        }

    };

});
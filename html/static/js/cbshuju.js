let pubcb = document.querySelector('.pubcb');
//发布菜谱的数据处理
pubcb.onclick = function () {
    let region = document.querySelector('.allattribute div:nth-child(1) a').innerHTML;
    let belongto = document.querySelector('.allattribute div:nth-child(2) a').innerHTML;
    let taste = document.querySelector('.allattribute div:nth-child(3) a').innerHTML;
    let title = document.querySelector('.cbname').value;
    let cbintro = document.querySelector('.cbintro').value;
    let gongxiao = document.querySelectorAll('.sp1');
    let label = document.querySelectorAll('.sp');
    let labellist = [];
    for (let ll of label) {
        labellist.push(ll.innerHTML)
    }
    let splist = [];
    for (let s of gongxiao) {
        splist.push(s.innerHTML);
    }

    let stepdiv = document.querySelectorAll('.margint.of');
    let stepall = [];
    for (let stepone of stepdiv) {
        if (stepone.children[2].children[0].value) {
            let step = {
                "stepnumber": stepone.children[0].innerHTML.split('.')[0],
                "picturesrc": "",
                "stepcontent": stepone.children[2].children[0].value,
            };
            stepall.push(step)
        }

    }
    //主料获取数据
    let mainmater = document.querySelectorAll('.mainmater .zhu');
    let zhuliaoall = [];
    for (let m of mainmater) {
        if (m.children[0].children[0].value != '') {
            let zhuliao = [];
            zhuliao.push(m.children[0].children[0].value);
            zhuliao.push(m.children[1].children[0].value);
            let h = zhuliao.join('');
            zhuliaoall.push(h)
        }
    }
    //辅料获取数据
    let fumater = document.querySelectorAll('.accessories .fu');
    let fuliaoall = [];
    for (let m of fumater) {
        if (m.children[0].children[0].value != '') {
            let fuliao = [];
            fuliao.push(m.children[0].children[0].value);
            fuliao.push(m.children[1].children[0].value);
            let h = fuliao.join('');
            fuliaoall.push(h)
        }
    }
    if (title) {
        if (region.length > 3) {
            motai.innerHTML = '请填写地区';
        } else {
            if (taste.length > 3) {
                motai.innerHTML = '请填写口味';
            } else {
                let cookbook = {
                    "cookbookname": title,
                    "belongto": belongto,
                    "userphone": sessionStorage.getItem('id'),
                    "cookbookpictures": '',
                    "foodzhu": zhuliaoall,
                    "foodfu": fuliaoall,
                    "style": region,
                    "taste": taste,
                    "totalpictures": '',
                    "detailintroduce": cbintro,
                    "efficacy": splist.join(','),
                    "label": labellist,
                    "marche": stepall,
                };
                addcookbook(cookbook);
            }
        }
    } else {
        motai.innerHTML = '请填写标题';
    }
};

var motai = document.querySelector('.guan');
let choose = document.querySelector('.h5.btn.pubcb');

function addcookbook(cookbook) {
    if (choose.innerText == '发布菜谱') {
        $.ajax({
            url: uurl+'cookbook/uploadCk/',
            type: 'post',
            data: JSON.stringify(cookbook),
            success: function (res) {
                res = JSON.parse(res);
                if (res['code'] == '205') {
                    motai.innerHTML = '发布成功,我们会尽快给您审核通知';
                    setTimeout(function () {
                            location.href = 'personalCenter.html'
                        }
                        , 1000);

                } else {
                    motai.innerHTML = '发布失败,请重试';
                }
            }
        })
    } else if (choose.innerText == '保存菜谱') {
        cookbook.ckid=getid;
        $.ajax({
            url: uurl+'cookbook/saveCk/',
            type: 'post',
            data: JSON.stringify(cookbook),
            success: function (res) {
                res = JSON.parse(res);
                if (res['code'] == '205') {
                    motai.innerHTML = '保存成功';
                    setTimeout(function () {
                            location.href = 'personalCenter.html'
                        }
                        , 1000);

                } else {
                    motai.innerHTML = '请重试';
                }
            }
        })
    }

}
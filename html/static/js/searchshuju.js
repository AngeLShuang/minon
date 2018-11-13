let allshuju = [];
let linshi = [];
let index = 1;
let ls,chushi;
let pagecountall = 0;
let cblist = document.querySelector('.cbl-list');
let diqu = document.querySelector('.nav.nav-pills.d');
let kouwei = document.querySelector('.nav.nav-pills.k');
let gongyi = document.querySelector('.nav.nav-pills.g');
let btnsea = document.querySelector('.btn');
let pager = document.querySelector('.pager');
let diqus;
let kouweis;
let gongyis;
let conditions = {
    "dq": '',
    'kw': '',
    'gongyi': '',
    'search': '',
    'jishu': 1
};

//获得地区
$(function () {
    $.ajax({
        url: uurl+'cookbook/diqu/',
        type: 'get',
        data: null,
        success: function (res) {
            diqushuju = JSON.parse(res);
            diqu.innerHTML = '<li role="presentation"><a >不限</a></li>';
            for (let g of diqushuju) {
                diqu.innerHTML += `<li role="presentation"><a >${g}</a></li>`;
            }
            diqus=document.querySelectorAll('.nav.nav-pills.d li a');
        },
        error: function () {
            console.log('404');
        }
    })
});

//获得口味
$(function () {
    $.ajax({
        url: uurl+'cookbook/gettaste/',
        type: 'get',
        data: null,
        success: function (res) {
            kouweishuju = JSON.parse(res);
            //kw
            kouwei = '<li role="presentation"><a >不限</a></li>';
            for (let g of kouweishuju) {
                kouwei += `<li role="presentation"><a >${g}</a></li>`;
            }
            kouweis=document.querySelectorAll('.nav.nav-pills.k li a');
        },
        error: function () {
            console.log('404');
        }
    })
});

//获得工艺
$(function () {
    $.ajax({
        url: uurl+'cookbook/gong/',
        type: 'get',
        data: null,
        success: function (res) {
            gongyishuju = JSON.parse(res);
            //gy
            gongyi.innerHTML = '<li role="presentation"><a >不限</a></li>';
            for (let g of gongyishuju) {
                gongyi.innerHTML += `<li role="presentation"><a >${g}</a></li>`;
            }
            gongyis=document.querySelectorAll('.nav.nav-pills.g li a');
        },
        error: function () {
            console.log('404');
        }
    })
});

getshuju(conditions);

diqu.onclick = function (event) {
    if (event.target.nodeName = 'A') {
        if (event.target.innerHTML == '不限') {
            conditions.dq = '';
        } else {
            conditions.dq = event.target.innerHTML;
        }
        for(let i of diqus){
            $(i).removeClass('geybac')
        }
        $(event.target).addClass('geybac');
        conditions.jishu=1;
        linshi = [];
        getshuju(conditions);
        index = 1;
        getstart(index);
    }

};

kouwei.onclick = function (event) {
    if (event.target.nodeName = 'A') {
        if (event.target.innerHTML == '不限') {
            conditions.kw = '';
        } else {
            conditions.kw = event.target.innerHTML;
        }
        for(let i of kouweis){
            $(i).removeClass('geybac')
        }
        $(event.target).addClass('geybac');
        conditions.jishu = 1;
        linshi = [];
        getshuju(conditions);
        index = 1;
        getstart(index);
    }

};

gongyi.onclick = function (event) {
    if (event.target.nodeName = 'A') {
        if (event.target.innerHTML == '不限') {
            conditions.gongyi = '';
        } else {
            conditions.gongyi = event.target.innerHTML;
        }
        for(let i of gongyis){
            $(i).removeClass('geybac')
        }
        $(event.target).addClass('geybac');
        conditions.jishu = 1;
        linshi = [];
        getshuju(conditions);
        index = 1;
        getstart(index);
    }

};

btnsea.onclick = function (event) {
    conditions.search = $(this.previousElementSibling).children().val();
    conditions.jishu = 1;
    linshi = [];
    getshuju(conditions);
    index = 1;
    getstart(index);
};

function getshuju(conditions){
    $.ajax({
        url: uurl+'cookbook/getallsearch/',
        type: 'post',
        data: JSON.stringify(conditions),
        // async:true,
        success: function (res){
            allshuju = JSON.parse(res);
            for (let i of allshuju) {
                linshi.push(i)
            }
            // linshi = allshuju;
            ls = linshi;
            chushi=ls;
            pagecountall = Math.ceil(linshi.length / 8);
            document.querySelector('.jg').innerHTML = linshi.length;
            getstart(index);
            return allshuju
        },
        error: function () {
            console.log('404');
        }
    })
}

function getstart(index) {
    let start = (index - 1) * 8;
    let end = index * 8 > linshi.length ? linshi.length : index * 8;
    showshuju(start, end)
}

function showshuju(start, end) {
    cblist.innerHTML = ``;
    showpagefenye(pagecountall);
    for (let i = start; i < end; i++) {
        let mes = linshi[i];
        let one = mes.efficacy.toString().split(',')[0];
        cblist.innerHTML += `
            <div class="cbl" id="${mes.baseId}">
                    <div class="img">
                        <a href="xiangqing.html"  class="img"><img alt="${mes.cookbookName}"
                                                                               src="${mes.totalPictures}"></a>
                        <strong class="gx"><span>${one}</span></strong>
                    </div>
                    <div class="info">
                        <a   class="img"></a>
                        <div class="infoc">
                            <a  class="linkcb">
                                <ul>
                                    <li class="gy">${mes.belongTo}</li>
                                    <li class="kw">${mes.tasteLabel}</li>
                                    <li class="nd">${mes.styleName}</li>
                                </ul>
                            </a>
                            <div class="gx2">
                                <span>${mes.efficacy}</span>
                            </div>
                        </div>
                    </div>
                    <div class="infoma">
                        <h3>
                            <a  >
                                ${mes.cookbookName}
                            </a>
                        </h3>
                        <div class="d1">
                            <span>${mes.cllect} 收藏</span>
                            <span>${mes.browl} 浏览</span>
                        </div>
                        <a class="author" href="personalCenter.html" id="${mes.userphone_id}">
                            ${mes.userNickname}
                        </a>
                    </div>
                </div>
        `
    }
}

function getpages(conditions) {
    $.ajax({
        url: uurl+'cookbook/getallpages/',
        type: 'post',
        data: JSON.stringify(conditions),
        success: function (res) {
            console.log(res);
        },
        error: function () {
            console.log('404');
        }
    })
}

function showpagefenye(num) {
    pager.innerHTML = `
        <li><a  class="first">上一页</a></li>
    `;
    let nu = 0;
    if (num <= 3) {
        for (let n = 1; n <= num; n++) {
            pager.innerHTML += `
            <li class="linka"><a class="panum">${n}</a></li>
        `
        }
    } else {
        for (let i = index > num - 2 ? num - 2 : index; nu < 3; nu++, i++) {
            pager.innerHTML += `
            <li class="linka"><a class="panum">${i}</a></li>
        `
        }
    }
    pager.innerHTML += `
        <li><a  class="next">下一页</a></li>
    `;
    if (index * 8 > linshi.length - 16 && allshuju.length != 0) {
        conditions.jishu++;
        getshuju(conditions)
    }
};

pager.onclick = function (event) {
    if (event.target.className == 'first') {
        if (index > 1) {
            index--
        }
    } else if (event.target.className == 'next') {
        if (index < pagecountall) {
            index++
        }
    } else if (event.target.className == 'panum') {
        index = parseInt(event.target.innerText);
    }


    getstart(index);
};

document.querySelector('.cbl-list').onclick = function (event) {
    if ($(event.target).parents('.infoc')) {
        sessionStorage.setItem('nowfood',$(event.target).parents('.cbl').attr('id'));
        window.location.href='xiangqing.html'
    }
};

document.querySelector('.nav.nav-tabs.jiaonang.paixu').onclick = function (event) {
    let allli = document.querySelectorAll('.nav.nav-tabs.jiaonang.paixu li');
    for (let i of allli) {
        $(i).removeClass('active')
    }
    $(event.target).parent().addClass('active');
    if (event.target.className == 'moren') {
        linshi = chushi;
    } else if (event.target.className == 'time') {
        ls.sort(function (a, b) {
            return a.uploadtime < b.uploadtime ? 1 : -1;
        });
        linshi = ls
    } else if (event.target.className == 'hot') {
        ls.sort(function (a, b) {
            return a.browl < b.browl?1:-1;
        });
        linshi = ls
    }
    pagecountall = Math.ceil(linshi.length / 8);
    getstart(index);
};

good = {
    "food_name": sessionStorage.getItem('food_name'),
};
//每页显示9条数据
var page_size = 9;
//默认页码是第一页
var pindex = 1;
//页面总数默认为0
let page_acount = 0;
let allBooks = null;
let pages;

$(function () {
    ajax('GET', uurl+'cookbook/getbooksbyname/', good, function (res) {

        showshicai();

        page_acount = Math.ceil(res.length / page_size);

        // 将所有数据放入全局变量中
        allBooks = res;
        showPageSize(pindex);
        getBooksByPageIndex(pindex);


        let booksclick = document.querySelector('.cookbooklist');
        booksclick.onclick = function (event) {
            let nowfood = event.target.parentElement.parentElement.getAttribute('id');


            let $a = $(event.target);
            let $obj = $a.parents('.cookitem').find('.un');
            let heuserphone = $obj.attr('data-set');
            sessionStorage.setItem('nowfood', nowfood);
            sessionStorage.setItem('heuserphone', heuserphone);
            window.location.href = "xiangqing.html"
        }
    });
})


// //获取食材
function showshicai() {

    ajax('GET', uurl+'cookbook/shicai/', good, function (res) {
        if (res.length!=0) {
            let picture = document.querySelector('.intro-img');
            let info = document.querySelector('.info');
            let title = document.querySelector('.pathadress');
            let zuofa = document.querySelector('.foodtitle');
            let biaoqian = document.querySelector('.x');
            let len;
            for (let r of res) {
                len = r.gongxiao.length;
                for (let i = 0; i < len; i++) {
                    if (r.gongxiao[i] != 'None') {
                        biaoqian.innerHTML += `
                            <span>${r.gongxiao[i]}</span>
                            `;
                    }

                }


                picture.innerHTML = `
                <img src="${r.foodsrc}" alt="">
                `;
                info.innerHTML = `
                          <p class="h1">${r.foodname}</p>
            <span class="nickna">
            <span>【别名】：</span>
            <span>
            ${r.foodnickname.substr(2, r.foodnickname.length - 4)}
            </span>
            </span>
            <span class="sy">
            <span>【适宜人群】：</span>
            <span>
             ${r.goodfor.substr(2, r.goodfor.length - 4)}
            </span>
            </span>
            <span class="jj">
            <span>【禁忌人群】：</span>
            <span>
            ${r.badfor.substr(2, r.badfor.length - 4)}
            </span>
            </span>
                        `;
                title.innerHTML = `
                    <span><a href="#">食材百科</a></span>>
                     <span>${r.foodname}</span>
                    `
                zuofa.innerHTML = `
                     <div class="foodtitle">
         ${r.foodname}做法大全
     </div>`
            }
        } else {

            let title = document.querySelector('.info');
            title.innerHTML = `<h4>对不起,当前没有此食材介绍,我们会尽快添加,请您谅解</h4>`
        }

    });
}


// 根据页码显示数据
function getBooksByPageIndex(index) {
    let start = (index - 1) * page_size;
    let end = ((index) * page_size) > allBooks.length ? allBooks.length : ((index) * page_size);
    showBooks(start, end);
}

//展示页面内容
let book = document.querySelector('.cookbooklist');

function showBooks(start, end) {
    book.innerHTML = `
        <div class="motai">
            </div>
        `;
    //遍历出所有的cookbooks
    for (let i = start; i < end; i++) {


        book.innerHTML += `
           <div class="cookitem" id="${allBooks[i].baseid}" >
                <div class="item-img">
                    <img src="${allBooks[i].baseid__cookbookpictures}" alt="" ">
                </div>
                <div class="infoall" >
                    <div class="aa" >
                        <div class="infotop">
                            <div class="t">${allBooks[i].baseid__cookbookname}</div>
                            <div class="count">
                                <span>${allBooks[i].comment}</span>人评论
                                <span>${allBooks[i].collect}</span>收藏
                            </div>
                            <div class="un" data-set="${allBooks[i].userphone}">
                                ${allBooks[i].userphone__userinform__usernickname}
</div>
                            </div>
                        <div class="infobottom" ">
                            <div class="taste" >
                               <div>工艺:<span>${allBooks[i].baseid__belongto}</span></div>
                                <div>口味:<span>${allBooks[i].tasteid__tastelabel}</span></div>
                                <div>地区:<span>${allBooks[i].styleid__stylename}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           `;


    }
}

// 展示页码方法
function showPageSize(pindex) {
    let pagearea = document.querySelector('.fy .pagination');
    pages = page_acount;
    // alert(pages);

    pagearea.innerHTML = `
                   <li>
       
                        <span aria-label="Previous" title="pre" aria-hidden="true">&laquo;</span>
               
                </li>
                `;

    for (let i = pindex < 3 ? 1 : pindex; i <= pages; i++) {

        pagearea.innerHTML += `
                            <li><a href="javascript:void 0">${i}</a></li>
                        `
    }
    pagearea.innerHTML += `
                     <li>

                        <span aria-label="Next" title="next" aria-hidden="true">&raquo;</span>
     
                    </li>
                `;


}

let fy = document.querySelector('.fy');
fy.onclick = function (event) {


    if (event.target.nodeName == 'A') {
        if (event.target.innerText) {

            // if (pindex) {
            // alert(pages);
            pindex = parseInt(event.target.innerText);
            // }
        }


    } else if (event.target.nodeName == 'SPAN') {
        if (event.target.title == 'pre') {
            if (pindex > 1) {
                pindex = pindex - 1
            }
        } else {
            if (pindex <= page_acount - 1) {
                pindex = pindex + 1;
            }
        }

    }


    showPageSize(pindex);
    getBooksByPageIndex(pindex)
};


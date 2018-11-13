let lunbo=document.querySelector('.poster-list');
let lbtshuju;
$.ajax({
    url:uurl+'cookbook/getindex/',
    type:'get',
    data:null,
    success:function (res) {
        lbtshuju=JSON.parse(res);
         showlbt();
    },
    error:function () {
        console.log('404');
    }
});
function showlbt() {
    lunbo.innerHTML='';
    for(let i of lbtshuju){
        lunbo.innerHTML+=`
        <li class="poster-item"><a href="xiangqing.html"><img src="${i.src}" width="100%" ></a></li>
    `
    }

$(".B_Demo").PicCarousel({
"width":900,
"height":400,
"posterWidth":520,
"posterHeight":400,
"scale":0.9,
"speed":1000,
"autoPlay":true,
"delay":1000,
"verticalAlign":"top"
});

}

var h = 0;
var o = 0;

function show(infoc) {
    let ldis = infoc.style.left;
    let distance = parseInt(ldis.split('px')[0]);
    if (distance > 0) {
        h += 0.03;
        o += 0.08;
        leng = distance - h;
        infoc.style.left = leng + "px";
        infoc.style.opacity = o;
    } else {
        h=0;
        o=0;
        clearInterval(leter);
    }
}

function hide(infoc) {
    let ldis = infoc.style.left;
    let distance = parseInt(ldis.split('px')[0]);
    o=1;
    if (distance <= 232) {
        h += 0.6;
        o =o- 0.08;
        infoc.style.left = h + "px";
        infoc.style.opacity = o;
    } else {
        h=0;
        o=0;
        clearInterval(leter);
    }
}


var imgall = document.querySelectorAll('.info');
var leter;
for(let img of imgall){
    img.onmouseover = function () {
        var infoc=img.children[1];
        let ldis = infoc.style.left;
        let distance = parseInt(ldis.split('px')[0]);
        clearInterval(leter);
        if(distance>0){
            leter = setInterval(function () {
                show(infoc);
            }, 5);
        }
    };

    img.onmouseleave=function () {
        var infoc=img.children[1];
        let ldis = infoc.style.left;
        let distance = parseInt(ldis.split('px')[0]);
        clearInterval(leter);
        if(distance<=232){
            leter = setInterval(function () {
                hide(infoc);
            }, 5);
        }
    }
}
function ajax(type, url, data,callback) {
    //创建ajax对象
    let oAjax=null;
    if(window.XMLHttpRequest){
        oAjax= new XMLHttpRequest();
    }else{
        oAjax=new ActiveXObject();
    }

    //open
    if(type.toLowerCase()=='get'){
        url=addUrl(url,data);
        oAjax.open(type.toUpperCase(),url,true);
        res=null;
    }else if(type.toLowerCase()=='post'){
        oAjax.open(type.toUpperCase(),url,true);
        res=JSON.stringify(data);
        oAjax.setRequestHeader('content-type','application/json');
        oAjax.setRequestHeader('token',sessionStorage.getItem('token'));
    }
    //send
    oAjax.send(res);

    //解析
    oAjax.onreadystatechange=function () {
        try{
            if(oAjax.readyState==4){
                if(oAjax.status>=200 && oAjax.status<=300 || oAjax.status==304){
                    let result=JSON.parse(oAjax.responseText);
                    // console.log(result);
                    try {
                        let tt = oAjax.getResponseHeader('token');
                        result['token'] = tt;
                    }catch (e) {
                        result['token']=''
                    }
                    // console.log(result);
                    // console.log(tt);
                    // JSON.parse(result).token=tt;
                    callback(result);
                }else{
                    callback(null);
                }
            }
        }catch (e) {
            console.log(e.message);
            callback(null);
        }
    }

}

//url添加数据
function addUrl(url,data) {
    for(let k in data){
        url+=(url.indexOf("?")==-1)?"?":"&";
        url+=encodeURIComponent(k)+"="+encodeURIComponent(data[k]);
    }
    return url;
}
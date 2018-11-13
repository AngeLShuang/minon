function ajax(type,url,data,callback) {
    let oAjax = null;
    type=type.toUpperCase();
    if(window.XMLHttpRequest){
        oAjax = new XMLHttpRequest();
    }else{
        oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(type=='GET'){
        for(let k in data){
            url=addURLParam(url,k,data[k]);
        }

        oAjax.open(type,url,true);

        //1.
        oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //2.
        oAjax.setRequestHeader("token",sessionStorage.getItem('token'));
        oAjax.send(null);
    }else if(type=='POST'){
        oAjax.open(type,url,true);
        oAjax.setRequestHeader("Content-type","application/json;charset=utf-8");
        oAjax.setRequestHeader("token",sessionStorage.getItem('token'));
        // oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        oAjax.send(JSON.stringify(data));
    }
    oAjax.onreadystatechange=function(){
        try{
            if(oAjax.readyState==4){

                if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                    let result=JSON.parse(oAjax.responseText);
                    callback(result);
                }else{
                    callback(null);
                }
            }
        }catch (error){
            console.log(error.message);
            callback(null);
        }
    };
}
//    url格式化函数-------------------
function addURLParam(url,name,value) {
    url+=(url.indexOf("?")==-1)?"?":"&";
    url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}
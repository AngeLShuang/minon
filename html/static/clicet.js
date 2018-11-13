var ws=new WebSocket('ws://47.106.149.20:2333');
var newname;
    ws.onopen=function () {
try{
            stepcontent.onclick=function (event) {
                if(event.target.className=='xsbtn'){
                    event.target.parentElement.parentElement.parentElement.parentElement.style.display='none';
                }else if(event.target.className=='btnup'){
                    let texts;      //修改的内容
                    let pics;       //修改的图片
                    texts=$(event.target).parents('.inner').children('textarea').val();
                    // pics=$(event.target).parents('.inner').children('.bimg .upimg').val();
                    let buzouid=$(event.target).parents('.buzhou-content').attr('id');
                    let mes={
                        'content':texts,
                        'userphone_id':myid,
                        'stepid_id':buzouid,
                        'pic':'http://pgsnqecfs.bkt.clouddn.com/'+newname,
                        'phone_id':heuserphone
                    };
                    sendxiugai(mes,event.target)

                }else if(event.target.className=='xianshix'){
                    let dropdowns=document.querySelectorAll('.img-buzhou');
                    let div  = event.target.nextElementSibling;
                    for(let i of dropdowns){
                        if(div==i) {
                            if (div.style.display == "block") {
                                div.style.display = "none";
                            } else if (div.style.display == '' || div.style.display == "none") {
                                div.style.display = "block";
                            }
                        }else{
                            i.style.display="none";
                        }
                    }
                }else if(event.target.className=='mythink'){
                    if(myid){
                        event.target.nextElementSibling.style.display='block';
                        thiscook=$(event.target.nextElementSibling).find('.upimg');
                        // console.log(thiscook);

                        if(thiscook){
                            thiscook.on("change", function (e) {
                            var file = e.target.files[0]; //获取图片资源

                            // 只选择图片文件
                            if (!file.type.match('image.*')) {
                                return false;
                            }
                            var reader = new FileReader();
                            reader.readAsDataURL(file); // 读取文件
                            // 渲染文件
                        reader.onload = function (arg) {
                            e.target.nextElementSibling.src = arg.target.result
                        };

                        $.ajax({
                            url: uurl+'cookbook/getimgtoken/',
                            type: 'get',
                            data: null,
                            success: function (res) {
                                // console.log(res);
                                var token = res.uptoken;
                                 newname = res.key;
                                // console.log(newname);
                                var newfile = new File([file], newname);

                                var config = {
                                    useCdnDomain: false,
                                    disableStatisticsReport: true,
                                    retryCount: 6,
                                    region: qiniu.region.z0
                                };
                                var putExtra = {
                                    fname: "",
                                    params: {},
                                    mimeType: ["image/png", "image/jpeg", "image/gif"]
                                };
                                var key = newfile.name;
                                // 添加上传dom面板
                                putExtra.params["x:name"] = key.split(".")[0];
                                var subscription;
                                // 调用sdk上传接口获得相应的observable，控制上传和暂停
                                observable = qiniu.upload(file, key, token, putExtra);

                                subscription = observable.subscribe({
                                    next(res) {
                                        // ...
                                    },
                                    error(err) {
                                        swal(
                                          'error！',
                                          ' ',
                                          'error'
                                        );
                                    },
                                    complete(res) {
                                        swal(
                                          '上传成功！',
                                          ' ',
                                          'success'
                                        );
                                        // console.log(res)
                                        e.target.nextElementSibling.src='http://pgsnqecfs.bkt.clouddn.com/'+newname
                                    }
                                });

                            }
                        })  //end ajax

                    });

                        }
                    }else{
                        alert('请先登录');
                       
                    }
                }else if($(event.target).parents('.inner')[0]){
                    window.event?window.event.cancelBubble=true:event.stopPropagation();
                    if(event.target.className=='btnup'){
                        event.target.parentElement.nextElementSibling.style.display='block'
                    }else if(event.target.className=='resbtn') {
                        event.target.parentElement.parentElement.style.display = 'none';
                        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.display='none'
                    }
                }

            };
            function sendxiugai(mes,node) {
                $.ajax({
                    url:uurl+'cookbook/changeBuzou/',
                    type:'post',
                    data:JSON.stringify(mes),
                    success:function (res) {
                        if(res['code']=='210'){
                            node.parentElement.nextElementSibling.style.display='block';
                            let mess={
                                'content':mes['content'],
                                'uu':mes['userphone_id'],
                                'pic':'http://pgsnqecfs.bkt.clouddn.com/'+newname,
                                'stepid_id':mes['stepid_id'],
                                'yours':heuserphone
                            };
                            $.ajax({
                                url:uurl+'cookbook/setuserchangeck/',
                                type:'post',
                                data:JSON.stringify(mess),
                                success:function (res) {
                                    // console.log(res);
                                },
                                error:function () {
                                    console.log('404');
                                }
                            });
                            ws.send(JSON.stringify(mess))
                        }else{
                            alert('请重试');
                        }
                    },
                    error:function () {
                        console.log('404');
                    }
                })
            }}catch(e){
}
        };

       ws.onmessage=function (mes) {
           if(uuuid==JSON.parse(mes.data).yours){
               $.ajax({
                   url:uurl+'cookbook/changeuserck/',
                   type:'post',
                   data:JSON.stringify(mes.data),
                   success:function (res) {
                       // console.log(res);
                   },
                   error:function () {
                       console.log('404');
                   }
               });
            if(nnns.innerHTML){
                nnns.innerHTML=parseInt(nnns.innerHTML)+1;
            }else{
                nnns.innerHTML=1;
            }
            swal({
              title: '修改步骤',
              text: JSON.parse(mes.data).uu+'申请修改'+JSON.parse(mes.data).stepid_id+'内容为:'+JSON.parse(mes.data).content,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '立即查看！',
            }).then(function(res){
                if(res.value && res.value===true){
                    window.location.href='changeStep.html';
                }

            })
            // alert(JSON.parse(mes.data).userphone_id,' 修改了',JSON.parse(mes.data).stepid_id,' 内容为:'+JSON.parse(mes.data).content)
        }
    };

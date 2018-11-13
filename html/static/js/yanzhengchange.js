let nn;
let nns=document.querySelector('.ns');
$.ajax({
    url:uurl+'cookbook/getchange/',
    type:'get',
    data:{'myid':uuid},
    success:function (res) {
        res=JSON.parse(res);
        nn=res.length;
        if(nn){
            res=res[0];
            let mm={
            'content':res.content,
            'uu':res.phone_id,
            'pic':res.pic,
            'stepid_id':res.stepid_id,
            'yours':res.userphone_id
        };
        // console.log(mm);
        $.ajax({
            url:uurl+'cookbook/changeuserck/',
            type:'post',
            data:JSON.stringify(mm),
            success:function (res) {
                // console.log(res);
            },
            error:function () {
                console.log('404');
            }
        });
        if(nn){
            nns.innerHTML=nn;
        }
        swal({
            title: '修改步骤',
            text: res.phone_id+'申请修改'+res.stepid_id+'内容为:'+res.content,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '立即查看！',
        }).then(function(res){
            console.log(res);
            if(res.value && res.value===true){
                window.location.href='changeStep.html';
            }

        })
        }

    },
    error:function () {
        console.log('404');
    }
});
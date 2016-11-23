/**
 * Created by fuzhihong on 16/11/23.
 */
$(function () {
    $('.del').on('click',function(e){
        var target=$(e.target)
        var id=target.data('id')
        var tr=$('.item-id-'+id)
        console.log(target,id,tr)
        $.ajax({
            type:'DELETE',
            url:'/admin/list?id='+id
        })
        .done(function(res){
                if(res.success===1){
                    if(tr.length>0){
                        tr.remove()
                    }
                }
            })
    })
})
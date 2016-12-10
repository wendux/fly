/**
 * Created by du on 16/12/10.
 */

const ah=require("ajax-hook")

ah.hookAjax({
    onreadystatechange:function(xhr){
        console.log("onreadystatechange called: %O",xhr)
        //return true

    },
    onload:function(xhr){
        console.log("onload called: %O",xhr)
        xhr.responseText="hook"+xhr.responseText;
        //return true;
    },
    open:function(arg,xhr){
        console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2],xhr)
        arg[1]+="?hook_tag=1";
        //统一添加请求头

    },
    send:function(arg,xhr){
        console.log("send called: %O",arg[0])
        xhr.setRequestHeader("_custom_header_","ajaxhook")
    },
    setRequestHeader:function(arg,xhr){
        console.log("setRequestHeader called!",arg)
    }
})

$.get().done(function(d){
    console.log(d.substr(0,30)+"...")
    //use original XMLHttpRequest
    console.log("unhook")
    ah.unHookAjax()
    $.get().done(function(d){
        console.log(d.substr(0,10))
    })

})

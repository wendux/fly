function adapter(bridge) {
    return function (request, responseCallBack) {
        bridge.callHandler("onAjaxRequest",request,(response)=>{
            responseCallBack(response)
        })
    }
}
//build环境定义全局变量
KEEP("build", () => {
    window.wjsbAdapter= adapter
})
KEEP("!build", () => {
    module.exports = adapter;
})

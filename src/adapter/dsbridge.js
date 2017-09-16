
//确保dsBridge初始化
window._dsbridge && _dsbridge.init();
var adapter;
if(window.dsBridge) {
    adapter = {
        onRequest: function (request, responseCallBack) {
            dsBridge.call("onAjaxRequest",request,function (responseData) {
                responseCallBack(JSON.parse(responseData))
            })
            // responseCallBack({
            //     responseText: '{"aa":5}',
            //     statusCode: 200,
            //     headers: {
            //         "Content-Type": "application/json; charset=UTF-8"
            //     }
            // })
        }
    }
}else{
    console.error("dsBridge is not exist!")
}

module.exports= adapter;
let handleImgBase64Data = require("../utils/ImgBase64Handler")

// Reference from  https://github.com/marcuswestin/WebViewJavascriptBridge
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function adapter(request, responseCallBack) {
     setupWebViewJavascriptBridge(function (bridge) {
         bridge.callHandler("onAjaxRequest",request,(responseData)=>{
             responseData = JSON.parse(responseData);
             if(request.responseType==="stream") {
                 handleImgBase64Data(responseData);
             }
             responseCallBack(responseData)
         })
     })
}
//build环境定义全局变量
KEEP("cdn||cdn-min", () => {
    window.wjsbAdapter= adapter
})

module.exports = adapter;


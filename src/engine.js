/*
 * author: wendu
 * email: 824783146@qq.com
 **/
var trim = require('./utils').trim;
var type=require('./utils').type;
var log = console.log;
var adapter;
class AjaxEngine {
    constructor() {
        this.requestHeaders = {};
        this.readyState = 0;
        this.timeout = 0;//无超时
        this.responseURL = "";
        self.responseHeaders = {};
        this.onreadystatechange
            = this.onload
            = this.onerror
            = this.ontimeout
            = this.onloadend
            = null;
    }
    _changeReadyState(state) {
        this.readyState = state;
        this.onreadystatechange && this.onreadystatechange();
    }
    _end() {
        this.onloadend && this.onloadend();
    }

    open(method, url) {
        this.method = method;
        if (!url) {
            url = location.href;
        } else {
            url = trim(url);
            if (url.indexOf("http") !== 0) {
                //是浏览器环境
                if (typeof document !== "undefined") {
                    var t = document.createElement("a");
                    t.href = url;
                    url = t.href;
                }
            }
        }
        this.responseURL = url;
        this._changeReadyState(1)
    }

    send(arg) {
        arg=arg||null;
        var dataType=type(arg)
        if(["null","object","array","string","number"].indexOf(dataType)===-1){
            this.abort(`Sorry! an error occurred in function "send" of AjaxEngine ,${dataType} is not supported yet!`);
            return ;
        }
        this.requestHeaders.cookie = document.cookie;
        var self = this;
        if (adapter) {
            var request = {
                method: self.method,
                url: self.responseURL,
                headers: self.requestHeaders,
                data: arg
            }
            self._changeReadyState(3)
            var timer;
            if (self.timeout > 0) {
                timer = setTimeout(() => {
                    if (self.readyState === 3) {
                    self._end()
                    self._changeReadyState(0);
                    self.ontimeout&&self.ontimeout();

                }
            }, self.timeout);
            }
            adapter(request, function (response) {
                //超时了
                if (self.readyState !== 3) return;
                clearTimeout(timer)

                self.status = response.statusCode-0;
                //网络错误,端上返回0时代表错误
                if(self.status===0){
                    self.statusText= response.responseText;
                    self._onerror(response.errMsg);
                }else {
                    var headers = {};
                    for (var field in response.headers) {

                        var value=response.headers[field];
                        var key=field.toLowerCase();
                        //是数组直接赋值
                        if(typeof value==="object"){
                            headers[key]=value;
                        }else{
                            headers[key]=headers[key]||[]
                            headers[key].push(value)
                        }
                    }
                    var cookies=headers["set-cookie"];
                    if(cookies){
                        cookies.forEach((e)=>{
                            document.cookie=e.replace(/;\s*httpOnly/g,"")
                        })
                    }
                    self.responseHeaders=headers;
                    //错误码信息,暂且为状态码
                    self.statusText = "" + self.status;
                    if (self.status >= 200 && self.status < 300) {
                        self.response = self.responseText = response.responseText;
                        var contentType = self.getResponseHeader("content-type");
                        //目前只支持json文档自动解析
                        if (contentType && contentType.indexOf('json') !== -1) {
                            self.response = JSON.parse(response.responseText)
                            //log(self.response)
                        }
                        //回调onload
                        self.onload && self.onload();
                    } else {
                        self._onerror();
                    }
                }
                self._changeReadyState(4);
                self._end();
            });
        }else {
            console.error("Ajax require adapter")
        }
    }

    setRequestHeader(key, value) {
        this.requestHeaders[trim(key)] = value;
    }

    getResponseHeader(key) {
        return this.responseHeaders[key].toString()
    }

    getAllResponseHeaders() {
        var str = "";
        for (var key in this.responseHeaders) {
            str += key + ":" + this.getResponseHeader(key) + "\r\n";
        }
        return str;
    }
    abort(msg) {
        this._changeReadyState(0)
        this._onerror(msg);
        this._end();
    }
    _onerror(msg=""){
        this.onerror && this.onerror({msg});
    }
    static setAdapter(requestAdapter){
        adapter = requestAdapter
    }
}
//build环境定义全局变量
KEEP("build", () => {
    window.AjaxEngine = AjaxEngine
})
//非build环境则导出
KEEP("!build", () => {
    module.exports = AjaxEngine;
})








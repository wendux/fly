/*
 * author: wendu
 * email: 824783146@qq.com
 * source code: https://github.com/wendux/Ajax-hook
 **/

var log = console.log;
var adapter = {
    onRequest: function (request, responseCallBack) {
        log(request);
        responseCallBack({
            responseText: '{"aa":5}',
            statusCode: 200,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
    }
}
//trim
class Ajax {
    constructor() {
        this.requestHeaders = {};
        this.readyState = 0;
        this.timeout = 0;//无超时
        this.responseURL = "";
        self.responseHeaders = {};
        this.onreadystatechange
            = this.onprogress
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
            url = url.trim();
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
        //log("send", arguments)
        this.requestHeaders.cookie = document.cookie;
        var self = this;
        if (adapter) {
            var request = {
                method: self.method,
                url: self.responseURL,//todo url 合并
                headers: self.requestHeaders,
                formData: arg
            }
            self._changeReadyState(3)
            var timer;
            if (self.timeout > 0) {
                timer = setTimeout(() => {
                    if (self.readyState === 3) {
                    self._end()
                    self._changeReadyState(0);

                }
            }, self.timeout);
            }
            adapter.onRequest(request, function (response) {
                //超时了
                if (self.readyState !== 3) return;
                clearTimeout(timer)
                //网络错误
                self.status = response.statusCode-0;
                if(self.status===0){
                    self.statusText= response.responseText;
                    self.onerror && self.onerror();
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
                        self.onerror && self.onerror();
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
        //应该trim一下
        this.requestHeaders[key] = value;
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

    abort() {
        this._changeReadyState(0)
        this._end();
    }
    static setAdapter(requestAdapter){
        adapter = requestAdapter
    }
}
module.exports=Ajax;






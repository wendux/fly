/*
 * author: wendu
 * email: 824783146@qq.com
 **/
var util = require('./utils')
var log = console.log;
var isBrowser = typeof document !== "undefined";

function EngineWrapper(adapter) {
    class AjaxEngine {
        constructor() {
            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0;//无超时
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _call(name) {
            this[name] && this[name].apply(this, [].splice.call(arguments, 1))
        }

        _changeReadyState(state) {
            this.readyState = state;
            this._call("onreadystatechange")
        }

        open(method, url) {
            this.method = method;
            if (!url) {
                url = location.href;
            } else {
                url = util.trim(url);
                if (url.indexOf("http") !== 0) {
                    //是浏览器环境
                    if (isBrowser) {
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
            arg = arg || null;
            if (isBrowser) {
                var cookie=document.cookie
                if(cookie) {
                    this.requestHeaders.cookie = cookie;
                }
            }
            var self = this;
            if (adapter) {
                var request = {
                    method: self.method,
                    url: self.responseURL,
                    headers: self.requestHeaders || {},
                    data: arg
                }
                util.merge(request, self._options || {})
                if (request.method === "GET") {
                    request.data = null;
                }
                self._changeReadyState(3)
                var timer;
                self.timeout = self.timeout || 0;
                if (self.timeout > 0) {
                    timer = setTimeout(() => {
                        if (self.readyState === 3) {
                            this._call("onloadend");
                            self._changeReadyState(0);
                            self._call("ontimeout");

                        }
                    }, self.timeout);
                }
                request.timeout = self.timeout;
                adapter(request, function (response) {
                    //超时了
                    if (self.readyState !== 3) return;
                    clearTimeout(timer)

                    self.status = response.statusCode - 0;
                    //网络错误,端上返回0时代表错误
                    if (self.status === 0) {
                        self.statusText = response.responseText;
                        self._call("onerror", {msg: response.errMsg});

                    } else {
                        var headers = {};
                        for (var field in response.headers) {

                            var value = response.headers[field];
                            var key = field.toLowerCase();
                            //是数组直接赋值
                            if (typeof value === "object") {
                                headers[key] = value;
                            } else {
                                headers[key] = headers[key] || []
                                headers[key].push(value)
                            }
                        }
                        var cookies = headers["set-cookie"];
                        if (isBrowser && cookies) {
                            cookies.forEach((e) => {
                                document.cookie = e.replace(/;\s*httpOnly/ig, "")
                            })
                        }
                        self.responseHeaders = headers;
                        //错误码信息,暂且为状态码
                        self.statusText = response.statusMessage || "";
                        self.response = self.responseText = response.responseText;
                        self._response=response;
                        self._changeReadyState(4);
                        self._call("onload");
                    }
                    self._call("onloadend");
                });
            } else {
                console.error("Ajax require adapter")
            }
        }

        setRequestHeader(key, value) {
            this.requestHeaders[util.trim(key)] = value;
        }

        getResponseHeader(key) {
            return (this.responseHeaders[key.toLowerCase()] || "").toString()
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
            this._call("onerror", {msg});
            this._call("onloadend");
        }

        static setAdapter(requestAdapter) {
            adapter = requestAdapter
        }
    }

    return AjaxEngine;
}

//build环境定义全局变量
KEEP("build", () => {
    window.EngineWrapper = EngineWrapper
})
//非build环境则导出
KEEP("!build", () => {
    module.exports = EngineWrapper;
})








/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = require('./utils/utils')
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    class AjaxEngine {
        constructor() {
            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0;// 0 stands for no timeout
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
                    // Normalize the request url
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
                    body: arg
                }
                util.merge(request, self._options || {})
                if (request.method === "GET") {
                    request.body = null;
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

                    // If the request has already timeout, return
                    if (self.readyState !== 3) return;
                    clearTimeout(timer)

                    // Make sure the type of status is integer
                    self.status = response.statusCode - 0;

                    // Network error, set the status code 0
                    if (self.status === 0) {
                        self.statusText = response.responseText;
                        self._call("onerror", {msg: response.statusMessage});

                    } else {
                        // Parsing the response headers to array in a object,  because
                        // there may be multiple values with the same header name
                        var headers = {};
                        for (var field in response.headers) {
                            var value = response.headers[field];
                            var key = field.toLowerCase();
                            // Is array
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
                                // Remove the http-Only property of the  cookie
                                // so that JavaScript can operate it.
                                document.cookie = e.replace(/;\s*httpOnly/ig, "")
                            })
                        }
                        self.responseHeaders = headers;
                        // Set the fields of engine from response
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

// learn more about keep-loader: https://github.com/wendux/keep-loader
KEEP("cdn||cdn-min", () => {
    // This code block will be removed besides the  "CDN" and "cdn-min" build environment
    window.EngineWrapper = EngineWrapper
})
module.exports = EngineWrapper;










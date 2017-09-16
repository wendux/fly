class Fly {
    constructor(engine = XMLHttpRequest) {
        this.engine = engine;
        this.interceptors = {
            response: {
                use(handler,onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use(handler) {
                    this.handler = handler;
                }
            }
        }
        this.config = {timeout: 0, baseURL: ""}
    }

    formatParams(data) {
        var arr = [];
        var _encode = encodeURIComponent;
        for (var name in data) {
            var value = data[name]
            if (typeof value === "object") {
                value = JSON.stringify(value);
            }
            arr.push(_encode(name) + "=" + _encode(value));
        }
        return arr.join("&");
    }

    ajax(url = "", data, options) {
        var xhr = new this.engine;
        var promise = new Promise((resolve, reject) => {
            options = options || {};
            options.method = options.method || "GET";
            options.headers = options.headers || {};
            var rqi = this.interceptors.request;
            var rpi = this.interceptors.response;
            options.params = data;
            url = url.trim();
            if (!url) url = location.href;
            var baseUrl = this.config.baseURL.trim();
            if (url.indexOf("http") !== 0) {
                if (!baseUrl) {
                    var arr = location.pathname.split("/");
                    arr.pop();
                    baseUrl = location.protocol + "//" + location.host + arr.join("/")
                }
                if (baseUrl[baseUrl - 1] !== "/") {
                    baseUrl += '/'
                }
                url = baseUrl + (url[0] === "/" ? url.substr(1) : url)
                if (typeof document !== "undefined") {
                    var t = document.createElement("a");
                    t.href = url;
                    url = t.href;
                }
            }
            options.url = url;
            var abort = false;
            var operate = {
                reject: (e) => {
                    abort = true;
                    reject(e)
                }, resolve: (d) => {
                    abort = true;
                    resolve(d)
                }
            };

            if (rqi.handler) {
                options = rqi.handler(options, operate);
                if(!options){
                    console.warn("interceptors should return a value, request aborted")
                    return ;
                }
            }
            if (abort) return;
            options.params = this.formatParams(options.params);
            xhr.timeout = this.config.timeout || 0;
            var method = options.method.toUpperCase();
            if (method === "GET") {
                if (options.params) {
                    options.url += (options.url.indexOf("?") === -1 ? "?" : "&") + options.params;
                }
                xhr.open("GET", options.url);
            } else {
                xhr.open("POST", options.url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            for (var k in options.headers) {
                xhr.setRequestHeader(k, options.headers[k])
            }
            var onerror = function (e) {
                if (rpi.onerror) {
                    e = rpi.onerror(e, operate)
                }
                return e;
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var response = xhr.response;
                    if (rpi.handler) {
                        response = rpi.handler({xhr,request: options, data: response }, operate)
                    }
                    if (abort) return;
                    resolve(response);
                } else {
                    var err = new Error(xhr.statusText)
                    err.status = xhr.status;
                    err = onerror(err)
                    if (abort) return;
                    reject(err)
                }
            }

            xhr.onerror = () => {
                var err = new Error("net error")
                err.status = 0;
                err = onerror(err)
                if (abort) return;
                reject(err);
            }
            xhr.ontimeout = () => {
                var err = new Error(`timeout[${xhr.timeout}ms]`)
                err.status=1;
                err = onerror(err)
                if (abort) return;
                reject(err)
            }
            xhr.send(options.params)
        })
        promise.xhr = xhr;
        return promise;
    }

    get(url, data) {
        return this.ajax(url, data);
    }

    post(url, data) {
        return this.ajax(url, data, {method: "POST"});
    }
}

module.exports =  Fly;
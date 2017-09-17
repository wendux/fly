var utils = require('./utils');

class Fly {
    constructor(engine = XMLHttpRequest) {
        this.engine = engine;
        this.interceptors = {
            response: {
                use(handler, onerror) {
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
        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            withCredentials:false
        }
    }

    ajax(url = "", data, options) {
        var xhr = new this.engine;

        var promise = new Promise((resolve, reject) => {
            options = options || {};
            var defaultHeaders = {
                'Content-type': 'application/x-www-form-urlencoded',
            }
            utils.merge(defaultHeaders,this.config.headers)
            this.config.headers=defaultHeaders;
            utils.merge(options, this.config)
            var rqi = this.interceptors.request;
            var rpi = this.interceptors.response;
            options.data = data;
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
            url = utils.trim(url);
            options.method= options.method.toUpperCase();
            options.url = url;
            if (rqi.handler) {
                options = rqi.handler(options, operate);
                if (!options) return;
            }
            if (abort) return;
            url = utils.trim(options.url);
            if (!url) url = location.href;
            var baseUrl = utils.trim(options.baseURL);
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
            xhr.timeout = options.timeout || 0;
            xhr.withCredentials=!!options.withCredentials;
            if (options.method === "GET") {
                if (options.data) {
                    data = utils.formatParams(options.data);
                    url += (url.indexOf("?") === -1 ? "?" : "&") + data;
                }
                xhr.open("GET", url);
            } else {
                xhr.open("POST", url);
            }
            if (utils.isObject(options.data)) {
                options.headers["Content-type"] = 'application/json;charset=utf-8'
                data = JSON.stringify(options.data);
            }

            for (var k in options.headers) {
                //删除content-type
                if (k.toLowerCase() === "content-type" && (utils.isFormData(options.data) || !options.data||options.method==="GET")) {
                    delete options.headers[k]; // Let the browser set it
                } else {
                    xhr.setRequestHeader(k, options.headers[k])
                }
            }

            var onerror = function (e) {
                if (rpi.onerror) {
                    e = rpi.onerror(e, operate)
                }
                return e;
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var response = xhr.responseText;
                    if(xhr.getResponseHeader("Content-Type").indexOf("json")!==-1){
                        response=JSON.parse(response);
                    }
                    if (rpi.handler) {
                        response = rpi.handler({xhr, request: options, data: response}, operate)
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
                err.status = 1;
                err = onerror(err)
                if (abort) return;
                reject(err)
            }
            xhr.send(data)
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
    all(promises){
        return Promise.all(promises)
    }
}

//build环境定义全局变量
KEEP("build", () => {
    window.fly = new Fly;
    window.Fly = Fly;
})
//build环境定义全局变量
KEEP("!build", () => {
    module.exports = Fly;
})

var utils = require('./utils');
var isBrowser=typeof document !== "undefined";
class Fly {
    constructor(engine) {
        this.engine = engine||XMLHttpRequest;
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

    request(url, data, options) {
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
            url = utils.trim(url||"");
            options.method= options.method.toUpperCase();
            options.url = url;
            if (rqi.handler) {
                options = rqi.handler(options, operate);
                if (!options) return;
            }
            if (abort) return;
            url = utils.trim(options.url);
            if (!url&&isBrowser) url = location.href;
            var baseUrl = utils.trim(options.baseURL||"");
            if (url.indexOf("http") !== 0) {
                if (!baseUrl&&isBrowser) {
                    var arr = location.pathname.split("/");
                    arr.pop();
                    baseUrl = location.protocol + "//" + location.host + arr.join("/")
                }
                if(baseUrl[baseUrl.length-1]!=="/"){
                    baseUrl+="/"
                }
                url = baseUrl + (url[0] === "/" ? url.substr(1) : url)
                if (isBrowser) {
                    var t = document.createElement("a");
                    t.href = url;
                    url = t.href;
                }
            }
            xhr.timeout = options.timeout || 0;
            xhr.withCredentials=!!options.withCredentials;
            var isGet=options.method === "GET"
            if (isGet) {
                if (options.data) {
                    data = utils.formatParams(options.data);
                    url += (url.indexOf("?") === -1 ? "?" : "&") + data;
                }
                xhr.open("GET", url);
            } else {
                xhr.open("POST", url);
            }
            if (["object","array"].indexOf(utils.type(options.data))!==-1) {
                options.headers["Content-type"] = 'application/json;charset=utf-8'
                data = JSON.stringify(options.data);
            }

            for (var k in options.headers) {
                //删除content-type
                if (k.toLowerCase() === "content-type" && (utils.isFormData(options.data) || !options.data||isGet)) {
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
                    if((xhr.getResponseHeader("Content-Type")||"").indexOf("json")!==-1){
                        response=JSON.parse(response);
                    }
                    var data={data: response,xhr, request: options };
                    utils.merge(data,xhr._response)
                    if (rpi.handler) {
                        data = rpi.handler(data, operate)
                    }
                    if (abort) return;
                    resolve(data);
                } else {
                    var err = new Error(xhr.statusText)
                    err.status = xhr.status;
                    err = onerror(err)
                    if (abort) return;
                    reject(err)
                }
            }

            xhr.onerror = (e) => {
                var err = new Error(e.msg||"Network Error")
                err.status = 0;
                err = onerror(err)
                if (abort) return;
                reject(err);
            }

            xhr.ontimeout = () => {
                var err = new Error(`timeout [ ${xhr.timeout}ms ]`)
                err.status = 1;
                err = onerror(err)
                if (abort) return;
                reject(err)
            }
            xhr._options=options;
            xhr.send(isGet?null:data)

        })
        promise.xhr = xhr;
        return promise;
    }

    get(url, data) {
        return this.request(url, data);
    }

    post(url, data) {
        return this.request(url, data, {method: "POST"});
    }
    all(promises){
        return Promise.all(promises)
    }
    spread(callback) {
        return function wrap(arr) {
            return callback.apply(null, arr);
        }
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

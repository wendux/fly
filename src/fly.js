var utils = require('./utils/utils');
var isBrowser = typeof document !== "undefined";

class Fly {
    constructor(engine) {
        this.engine = engine || XMLHttpRequest;
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
            withCredentials: false
        }
    }

    request(url, data, options) {
        var engine = new this.engine;
        var promise = new Promise((resolve, reject) => {
            options = options || {};
            this.config.headers=utils.merge(this.config.headers||{},{'Content-Type': 'application/x-www-form-urlencoded'})
            utils.merge(options, this.config)
            var rqi = this.interceptors.request;
            var rpi = this.interceptors.response;
            options.body = data || options.body;
            var abort = false;

            // For interceptors to interrupt the request
            var operate = {
                reject: (e) => {
                    abort = true;
                    reject(e)
                }, resolve: (d) => {
                    abort = true;
                    resolve(d)
                }
            };
            url = utils.trim(url || "");
            options.method = options.method.toUpperCase();
            options.url = url;
            if (rqi.handler) {
                options = rqi.handler(options, operate);
                if (!options) return;
            }

            // If the interceptors have interrupted the request , return
            if (abort) return;

            // Normalize the request url
            url = utils.trim(options.url);
            if (!url && isBrowser) url = location.href;
            var baseUrl = utils.trim(options.baseURL || "");
            if (url.indexOf("http") !== 0) {
                var isAbsolute = url[0] === "/";
                if (!baseUrl && isBrowser) {
                    var arr = location.pathname.split("/");
                    arr.pop();
                    baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"))
                }
                if (baseUrl[baseUrl.length - 1] !== "/") {
                    baseUrl += "/"
                }
                url = baseUrl + (isAbsolute ? url.substr(1) : url)
                if (isBrowser) {

                    // Normalize the url which contains the ".." or ".", such as
                    // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                    var t = document.createElement("a");
                    t.href = url;
                    url = t.href;
                }
            }

            var responseType = utils.trim(options.responseType || "")
            engine.withCredentials = !!options.withCredentials;
            var isGet=options.method === "GET";
            if (isGet) {
                if (options.body) {
                    data = utils.formatParams(options.body);
                    url += (url.indexOf("?") === -1 ? "?" : "&") + data;
                }
            }
            engine.open(options.method, url);

            // try catch for ie >=9
            try {
                engine.timeout = options.timeout || 0;
                if (responseType !== "stream") {
                    engine.responseType = responseType
                }
            } catch (e) {
            }

            // If the request data is json object, transforming it  to json string,
            // and set request content-type to "json". In browser,  the data will
            // be sent as RequestBody instead of FormData
            if (!utils.isFormData(options.body)&&["object", "array"].indexOf(utils.type(options.body)) !== -1) {
                options.headers["Content-type"] = 'application/json;charset=utf-8'
                data = JSON.stringify(options.body);
            }

            for (var k in options.headers) {
                if (k.toLowerCase() === "content-type" &&
                    (utils.isFormData(options.body) || !options.body || isGet)) {
                    // Delete the content-type, Let the browser set it
                    delete options.headers[k];
                } else {
                    try {
                        // In browser environment, some header fields are readonly,
                        // write will cause the exception .
                        engine.setRequestHeader(k, options.headers[k])
                    } catch (e) {}
                }
            }

            var onerror = function (e) {
                // Call response interceptor
                if (rpi.onerror) {
                    e = rpi.onerror(e, operate)
                }
                return e;
            }

            engine.onload = () => {
                if ((engine.status >= 200 && engine.status < 300) || engine.status === 304) {

                    // The xhr of IE9 has not response filed
                    var response = engine.response || engine.responseText;
                    if ((engine.getResponseHeader("Content-Type") || "").indexOf("json") !== -1
                        // Some third engine implement may transform the response text to json object automatically,
                        // so we should test the type of response before transforming it
                        && !utils.isObject(response)) {
                        response = JSON.parse(response);
                    }

                    var data = {data: response, engine, request: options};
                    // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                    utils.merge(data, engine._response)
                    if (rpi.handler) {
                        // Call response interceptor
                        data = rpi.handler(data, operate) || data
                    }
                    if (abort) return;
                    resolve(data);
                } else {
                    var err = new Error(engine.statusText)
                    err.status = engine.status;
                    err = onerror(err) || err
                    if (abort) return;
                    reject(err)
                }
            }

            engine.onerror = (e) => {
                // Handle network error
                var err = new Error(e.msg || "Network Error")
                err.status = 0;
                err = onerror(err)
                if (abort) return;
                reject(err);
            }

            engine.ontimeout = () => {
                // Handle timeout error
                var err = new Error(`timeout [ ${engine.timeout}ms ]`)
                err.status = 1;
                err = onerror(err)
                if (abort) return;
                reject(err)
            }
            engine._options = options;
            setTimeout(()=>{engine.send(isGet ? null : data)},0)
        })
        promise.engine = engine;
        return promise;
    }

    all(promises) {
        return Promise.all(promises)
    }

    spread(callback) {
        return function (arr) {
            return callback.apply(null, arr);
        }
    }
}

["get","post","put","delete","patch"].forEach(e=>{
    Fly.prototype[e]=function(url,data,option){
        return this.request(url,data,utils.merge({method:e},option))
    }
})

Fly.prototype

// Learn more about keep-loader: https://github.com/wendux/keep-loader
KEEP("cdn||cdn-min", () => {
    // This code block will be removed besides the  "CDN" and "cdn-min" build environment
    window.fly = new Fly;
    window.Fly = Fly;
})
module.exports = Fly;


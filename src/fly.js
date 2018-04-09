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
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        }
    }

    request(url, data, options) {
        var engine = new this.engine;
        var contentType = "Content-Type";
        var contentTypeLowerCase = contentType.toLowerCase();
        var promise = new Promise((resolve, reject) => {
            options = options || {};
            options.headers = options.headers || {};
            utils.merge(options, this.config)
            var headers = options.headers;
            headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || 'application/x-www-form-urlencoded';
            delete headers[contentTypeLowerCase]
            var rqi = this.interceptors.request;
            var rpi = this.interceptors.response;
            options.body = data || options.body;
            url = utils.trim(url || "");
            options.method = options.method.toUpperCase();
            options.url = url;
            if (rqi.handler) {
                options = rqi.handler(options, Promise) || options;
            }
            function isPromise(p) {
                // some  polyfill implementation of Promise may be not standard,
                // so, we test by duck-typing
                return p.then && p.catch
            }

            if (isPromise(options)) {
                options.then((d) => {
                    resolve(d)
                }, (err) => {
                    reject(err)
                })
                return
            }
            data = options.body;
            // Normalize the request url
            url = utils.trim(options.url);
            var baseUrl = utils.trim(options.baseURL || "");
            if (!url && isBrowser && !baseUrl) url = location.href;
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
            var isGet = options.method === "GET";
            if (isGet) {
                if (data) {
                    if (utils.type(data) !== "string") {
                        data = utils.formatParams(data);
                    }
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
            if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                options.headers[contentType] = 'application/json;charset=utf-8'
                data = JSON.stringify(data);
            }

            for (var k in options.headers) {
                if (k === contentType &&
                    (utils.isFormData(data) || !data || isGet)) {
                    // Delete the content-type, Let the browser set it
                    delete options.headers[k];
                } else {
                    try {
                        // In browser environment, some header fields are readonly,
                        // write will cause the exception .
                        engine.setRequestHeader(k, options.headers[k])
                    } catch (e) {
                    }
                }
            }

            function onresult(handler, options, type) {
                if (handler) {
                    //如果失败，添加请求信息
                    if (type) {
                        options.request = options;
                    }
                    // Call response interceptor
                    options = handler.call(rpi, options, Promise) || options
                }
                if (!isPromise(options)) {
                    options = Promise[type === 0 ? "resolve" : "reject"](options)
                }
                options.then(d => {
                    resolve(d)
                }).catch((e) => {
                    reject(e)
                })
            }


            function onerror(e) {
                e.engine = engine;
                onresult(rpi.onerror, e, -1)
            }

            function Err(msg, status) {
                this.message = msg
                this.status = status;
            }

            engine.onload = () => {
                // The xhr of IE9 has not response filed
                var response = engine.response || engine.responseText;
                if (options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                    // Some third engine implementation may transform the response text to json object automatically,
                    // so we should test the type of response before transforming it
                    && !utils.isObject(response)) {
                    response = JSON.parse(response);
                }
                var headers = {};
                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                items.pop();
                items.forEach((e) => {
                    var key = e.split(":")[0]
                    headers[key] = engine.getResponseHeader(key)
                })
                var status = engine.status
                var statusText = engine.statusText
                var data = {data: response, headers, status, statusText};
                // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                utils.merge(data, engine._response)
                if ((status >= 200 && status < 300) || status === 304) {
                    data.engine = engine;
                    data.request = options;
                    onresult(rpi.handler, data, 0)
                } else {
                    var e = new Err(statusText, status);
                    e.response = data
                    onerror(e)
                }
            }

            engine.onerror = (e) => {
                onerror(new Err(e.msg || "Network Error", 0))
            }

            engine.ontimeout = () => {
                onerror(new Err(`timeout [ ${engine.timeout}ms ]`, 1))
            }
            engine._options = options;
            setTimeout(() => {
                engine.send(isGet ? null : data)
            }, 0)

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

["get", "post", "put", "patch", "head", "delete"].forEach(e => {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({method: e}, option))
    }
})
// Learn more about keep-loader: https://github.com/wendux/keep-loader
KEEP("cdn||cdn-min", () => {
    // This code block will be removed besides the  "CDN" and "cdn-min" build environment
    window.fly = new Fly;
    window.Fly = Fly;
})
module.exports = Fly;



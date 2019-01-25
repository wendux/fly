var utils = require('./utils/utils');
var isBrowser = typeof document !== "undefined";

class Fly {
    constructor(engine) {
        this.engine = engine || XMLHttpRequest;

        this.default = this   //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve;
            var reject;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock() {
                    if (!resolve) {
                        interceptor.p = new Promise((_resolve, _reject) => {
                            resolve = _resolve
                            reject = _reject;
                        })
                    }
                },
                unlock() {
                    if (resolve) {
                        resolve()
                        _clear();
                    }
                },
                clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            })
        }

        var interceptors = this.interceptors = {
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

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

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
        var interceptors = this.interceptors;
        var requestInterceptor = interceptors.request;
        var responseInterceptor = interceptors.response;
        var requestInterceptorHandler = requestInterceptor.handler;
        var promise = new Promise((resolve, reject) => {
            if (utils.isObject(url)) {
                options = url;
                url = options.url;
            }
            options = options || {};
            options.headers = options.headers || {};

            function isPromise(p) {
                // some  polyfill implementation of Promise may be not standard,
                // so, we test by duck-typing
                return p && p.then && p.catch
            }

            /**
             * If the request/response interceptor has been locked，
             * the new request/response will enter a queue. otherwise, it will be performed directly.
             * @param [promise] if the promise exist, means the interceptor is  locked.
             * @param [callback]
             */
            function enqueueIfLocked(promise, callback) {
                if (promise) {
                    promise.then(() => {
                        callback()
                    })
                } else {
                    callback()
                }
            }

            // make the http request
            function makeRequest(options) {
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

                var customContentType = options.headers[contentType] || options.headers[contentType.toLowerCase()];

                // default content type
                var _contentType = "application/x-www-form-urlencoded";
                // If the request data is json object, transforming it  to json string,
                // and set request content-type to "json". In browser,  the data will
                // be sent as RequestBody instead of FormData
                if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                    data = utils.formatParams(data);
                } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                    _contentType = 'application/json;charset=utf-8'
                    data = JSON.stringify(data);
                }
                //If user doesn't set content-type, set default.
                if (!customContentType) {
                    options.headers[contentType] = _contentType;
                }

                for (var k in options.headers) {
                    if (k === contentType && utils.isFormData(data)) {
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

                function onresult(handler, data, type) {
                    enqueueIfLocked(responseInterceptor.p, function () {
                        if (handler) {
                            //如果失败，添加请求信息
                            if (type) {
                                data.request = options;
                            }
                            var ret = handler.call(responseInterceptor, data, Promise)
                            data = ret === undefined ? data : ret;
                        }
                        if (!isPromise(data)) {
                            data = Promise[type === 0 ? "resolve" : "reject"](data)
                        }
                        data.then(d => {
                            resolve(d)
                        }).catch((e) => {
                            reject(e)
                        })
                    })
                }


                function onerror(e) {
                    e.engine = engine;
                    onresult(responseInterceptor.onerror, e, -1)
                }

                function Err(msg, status) {
                    this.message = msg
                    this.status = status;
                }

                engine.onload = () => {
                    // The xhr of IE9 has not response filed
                    var response = engine.response || engine.responseText;
                    if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
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
                        onresult(responseInterceptor.handler, data, 0)
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
            }

            enqueueIfLocked(requestInterceptor.p, () => {
                utils.merge(options, this.config)
                var headers = options.headers;
                headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                delete headers[contentTypeLowerCase]
                options.body = data || options.body;
                url = utils.trim(url || "");
                options.method = options.method.toUpperCase();
                options.url = url;
                var ret = options;
                if (requestInterceptorHandler) {
                    ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                }
                if (!isPromise(ret)) {
                    ret = Promise.resolve(ret)
                }
                ret.then((d) => {
                    //if options continue
                    if (d === options) {
                        makeRequest(d)
                    } else {
                        resolve(d)
                    }
                }, (err) => {
                    reject(err)
                })
            })
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

//For typeScript
Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(e => {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({method: e}, option))
    }
})
    ["lock", "unlock", "clear"].forEach(e => {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    }
})
// Learn more about keep-loader: https://github.com/wendux/keep-loader
KEEP("cdn||cdn-min", () => {
    // This code block will be removed besides the  "CDN" and "cdn-min" build environment
    window.fly = new Fly;
    window.Fly = Fly;
})
module.exports = Fly;



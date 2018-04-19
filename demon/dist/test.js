/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
        var a = factory();
        for (var i in a) {
            ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
        }
    }
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/__webpack_require__.i = function (value) {
                return value;
            };
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/
            return __webpack_require__(__webpack_require__.s = 2);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            };

            module.exports = {
                type: function type(ob) {
                    return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
                },
                isObject: function isObject(ob, real) {
                    if (real) {
                        return this.type(ob) === "object";
                    } else {
                        return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
                    }
                },
                isFormData: function isFormData(val) {
                    return typeof FormData !== 'undefined' && val instanceof FormData;
                },
                trim: function trim(str) {
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                },
                encode: function encode(val) {
                    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
                },
                formatParams: function formatParams(data) {
                    var arr = [];
                    for (var name in data) {
                        var value = data[name];
                        if (this.isObject(value)) {
                            value = JSON.stringify(value);
                        }
                        arr.push(this.encode(name) + "=" + this.encode(value));
                    }
                    return arr.join("&");
                },

                // Do not overwrite existing attributes
                merge: function merge(a, b) {
                    for (var key in b) {
                        if (!a.hasOwnProperty(key)) {
                            a[key] = b[key];
                        } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                            this.merge(a[key], b[key]);
                        }
                    }
                    return a;
                }
            };

            /***/
                }, ,
        /* 1 */
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            function KEEP(_, cb) {
                cb();
            }
            "use strict";

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var utils = __webpack_require__(0);
            var isBrowser = typeof document !== "undefined";

            var Fly = function () {
                function Fly(engine) {
                    _classCallCheck(this, Fly);

                    this.engine = engine || XMLHttpRequest;
                    var fly = this.default = this; //For typeScript
                    /**
                     * Factory to generate async task creators for interceptors.
                     * The current fly instance will be locked when an async task be created.
                     * Once locked, the incoming request will be added to a request queue, and the
                     * async task will not been dequeue and performed until the fly instance is unlocked.
                     *
                     * @param [interceptor] either is interceptors.request or interceptors.response
                     * @param [isResponseInterceptor] whether is interceptors.response or not
                     * @returns {Function} async task creators
                     */
                    function wrap(interceptor, isResponseInterceptor) {
                        /**
                         * Submit async task for interceptors.
                         * [promise] async task itself is a promise
                         */
                        return function (promise, lock) {
                            // `this` either is interceptors.request or interceptors.response
                            var _this = this;
                            /**
                             * [interceptor].p is a lock tag which actually is a Promise object.
                             * The current fly instance will be locked when an async task be submit
                             * in interceptors.
                             */
                            if (lock !== false) {
                                _this.p = new Promise(function (resolve) {
                                    function t() {
                                        if (interceptor.p) {
                                            if (isResponseInterceptor) {
                                                if (interceptor.p !== _this.p) {
                                                    _this.p = null;
                                                    resolve();
                                                } else {
                                                    interceptor.p = _this.p = null;
                                                    resolve();
                                                }
                                            } else {
                                                interceptor.p.then(function () {
                                                    _this.p = null;
                                                    resolve();
                                                });
                                            }
                                        } else {
                                            resolve();
                                            _this.p = null;
                                        }
                                    }

                                    //promise.finally() may not be implemented in some Promise polyfill, so we don't use it at now.
                                    promise.then(t, t);
                                });
                                if (isResponseInterceptor) {
                                    //
                                    if (!interceptor.p) {
                                        interceptor.p = _this.p;
                                    }
                                }
                            }
                            if (!isResponseInterceptor) {
                                fly.t = 1;
                            }
                            return promise;
                        };
                    }

                    var interceptors = this.interceptors = {
                        response: {
                            use: function use(handler, onerror) {
                                this.handler = handler;
                                this.onerror = onerror;
                            }
                        },
                        request: {
                            use: function use(handler) {
                                this.handler = handler;
                            }
                        }
                    };

                    var irq = interceptors.request;
                    var irp = interceptors.response;
                    // Generate async task creator for interceptor.
                    irq.await = wrap(irp);
                    irp.await = wrap(irq, 1);
                    this.config = {
                        method: "GET",
                        baseURL: "",
                        headers: {},
                        timeout: 0,
                        parseJson: true, // Convert response data to JSON object automatically.
                        withCredentials: false
                    };
                }

                _createClass(Fly, [{
                    key: "request",
                    value: function request(url, data, options) {
                        var _this2 = this;

                        var engine = new this.engine();
                        var contentType = "Content-Type";
                        var contentTypeLowerCase = contentType.toLowerCase();
                        var interceptors = this.interceptors;
                        var requestInterceptor = interceptors.request;
                        var responseInterceptor = interceptors.response;
                        var requestInterceptorHandler = requestInterceptor.handler;
                        var promise = new Promise(function (resolve, reject) {
                            if (utils.isObject(url)) {
                                options = url;
                                url = options.url;
                            }
                            options = options || {};
                            options.headers = options.headers || {};

                            function isPromise(p) {
                                // some  polyfill implementation of Promise may be not standard,
                                // so, we test by duck-typing
                                return p.then && p.catch;
                            }

                            /**
                             * If the current fly instance has been locked，the new request will enter the request queue
                             * @param [promise] Once the current fly instance is unlocked, this promise will be resolved.
                             *                  if the promise exist, indicate the current fly instance is locked.
                             * @param [callback]
                             */
                            function enqueueIfLocked(promise, callback) {
                                if (promise) {
                                    promise.then(function () {
                                        callback();
                                    });
                                } else {
                                    callback();
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
                                        baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                                    }
                                    if (baseUrl[baseUrl.length - 1] !== "/") {
                                        baseUrl += "/";
                                    }
                                    url = baseUrl + (isAbsolute ? url.substr(1) : url);
                                    if (isBrowser) {

                                        // Normalize the url which contains the ".." or ".", such as
                                        // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                                        var t = document.createElement("a");
                                        t.href = url;
                                        url = t.href;
                                    }
                                }

                                var responseType = utils.trim(options.responseType || "");
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
                                        engine.responseType = responseType;
                                    }
                                } catch (e) {
                                }

                                // If the request data is json object, transforming it  to json string,
                                // and set request content-type to "json". In browser,  the data will
                                // be sent as RequestBody instead of FormData
                                if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                                    options.headers[contentType] = 'application/json;charset=utf-8';
                                    data = JSON.stringify(data);
                                }

                                for (var k in options.headers) {
                                    if (k === contentType && (utils.isFormData(data) || !data || isGet)) {
                                        // Delete the content-type, Let the browser set it
                                        delete options.headers[k];
                                    } else {
                                        try {
                                            // In browser environment, some header fields are readonly,
                                            // write will cause the exception .
                                            engine.setRequestHeader(k, options.headers[k]);
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
                                            data = handler.call(responseInterceptor, data, Promise) || data;
                                        }
                                        if (!isPromise(data)) {
                                            data = Promise[type === 0 ? "resolve" : "reject"](data);
                                        }
                                        data.then(function (d) {
                                            resolve(d);
                                        }).catch(function (e) {
                                            reject(e);
                                        });
                                    });
                                }

                                function onerror(e) {
                                    e.engine = engine;
                                    onresult(responseInterceptor.onerror, e, -1);
                                }

                                function Err(msg, status) {
                                    this.message = msg;
                                    this.status = status;
                                }

                                engine.onload = function () {
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
                                    items.forEach(function (e) {
                                        var key = e.split(":")[0];
                                        headers[key] = engine.getResponseHeader(key);
                                    });
                                    var status = engine.status;
                                    var statusText = engine.statusText;
                                    var data = {
                                        data: response,
                                        headers: headers,
                                        status: status,
                                        statusText: statusText
                                    };
                                    // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                                    utils.merge(data, engine._response);
                                    if (status >= 200 && status < 300 || status === 304) {
                                        data.engine = engine;
                                        data.request = options;
                                        onresult(responseInterceptor.handler, data, 0);
                                    } else {
                                        var e = new Err(statusText, status);
                                        e.response = data;
                                        onerror(e);
                                    }
                                };

                                engine.onerror = function (e) {
                                    onerror(new Err(e.msg || "Network Error", 0));
                                };

                                engine.ontimeout = function () {
                                    onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                                };
                                engine._options = options;
                                setTimeout(function () {
                                    engine.send(isGet ? null : data);
                                }, 0);
                            }

                            enqueueIfLocked(requestInterceptor.p, function () {
                                utils.merge(options, _this2.config);
                                var headers = options.headers;
                                headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || 'application/x-www-form-urlencoded';
                                delete headers[contentTypeLowerCase];
                                options.body = data || options.body;
                                url = utils.trim(url || "");
                                options.method = options.method.toUpperCase();
                                options.url = url;
                                if (requestInterceptorHandler) {
                                    options = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                                }
                                var async = _this2.t;
                                delete _this2.t;
                                if (isPromise(options)) {
                                    options.then(function (d) {
                                        //support async  interceptors
                                        if (async) {
                                            makeRequest(d);
                                        } else {
                                            resolve(d);
                                        }
                                    }, function (err) {
                                        reject(err);
                                    });
                                } else {
                                    makeRequest(options);
                                }
                            });
                        });
                        promise.engine = engine;
                        return promise;
                    }
                }, {
                    key: "all",
                    value: function all(promises) {
                        return Promise.all(promises);
                    }
                }, {
                    key: "spread",
                    value: function spread(callback) {
                        return function (arr) {
                            return callback.apply(null, arr);
                        };
                    }
                }]);

                return Fly;
            }();

                    //For typeScript


                    Fly.default = Fly;

            ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
                Fly.prototype[e] = function (url, data, option) {
                    return this.request(url, data, utils.merge({ method: e }, option));
                };
            });
            // Learn more about keep-loader: https://github.com/wendux/keep-loader
            ;
            module.exports = Fly;

            /***/
        }]
        /******/)
    );
});
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(1)(module)))

/***/ }),
    /* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
    /* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function RFC1738(value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function RFC3986(value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

/***/ }),
    /* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = Object.prototype.hasOwnProperty;

var hexTable = function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}();

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && _typeof(target[i]) === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (c === 0x2D // -
        || c === 0x2E // .
        || c === 0x5F // _
        || c === 0x7E // ~
        || c >= 0x30 && c <= 0x39 // 0-9
        || c >= 0x41 && c <= 0x5A // a-z
        || c >= 0x61 && c <= 0x7A // A-Z
        ) {
                out += string.charAt(i);
                continue;
            }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        i += 1;
        c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
        out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

        /***/
    }),
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


//For browser entry
        var Fly = __webpack_require__(0);
        var fly = new Fly();
        module.exports = fly;

        /***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(9);
var parse = __webpack_require__(8);
        var formats = __webpack_require__(2);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


        var _index = __webpack_require__(4);

        var _index2 = _interopRequireDefault(_index);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

/**
 * Created by du on 16/12/10.
 */
//var fly = require("../index")
var qs = __webpack_require__(5);

        _index2.default.get("../package.json", {aa: 8, bb: 9, tt: {xx: 5}}).then(function (d) {
    console.log("get result:", d);
}).catch(function (e) {
    return console.log("error", e);
});

        _index2.default.post("../package.json", {aa: 8, bb: 9, tt: {xx: 5}}).then(function (d) {
    console.log("post result:", d);
}).catch(function (e) {
    return console.log("error", e);
});

        _index2.default.request("../package.json", {hh: 5}, {
    method: "post"
}).then(function (d) {
    console.log("ajax result:", d);
});

//send data in the application/x-www-form-urlencoded format
        _index2.default.get("", qs.stringify({aa: 8, bb: 9, tt: {xx: 5}})).then(function (d) {
        });
        _index2.default.post("../package.json", qs.stringify({aa: 8, bb: 9, tt: {xx: 5}})).then(function (d) {
        });

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


        var utils = __webpack_require__(3);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObject(chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

        var utils = __webpack_require__(3);
        var formats = __webpack_require__(2);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) {
        // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};

/***/ })
/******/ ]);
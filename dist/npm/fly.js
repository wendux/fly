(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;
        this.interceptors = {
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
        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var promise = new Promise(function (_resolve, _reject) {
                options = options || {};
                _this.config.headers = utils.merge(_this.config.headers || {}, { 'Content-Type': 'application/x-www-form-urlencoded' });
                utils.merge(options, _this.config);
                var rqi = _this.interceptors.request;
                var rpi = _this.interceptors.response;
                options.body = data || options.body;
                var abort = false;

                // For interceptors to interrupt the request
                var operate = {
                    reject: function reject(e) {
                        abort = true;
                        _reject(e);
                    }, resolve: function resolve(d) {
                        abort = true;
                        _resolve(d);
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
                        engine.responseType = responseType;
                    }
                } catch (e) {}

                // If the request data is json object, transforming it  to json string,
                // and set request content-type to "json". In browser,  the data will
                // be sent as RequestBody instead of FormData
                if (!utils.isFormData(options.body) && ["object", "array"].indexOf(utils.type(options.body)) !== -1) {
                    options.headers["Content-type"] = 'application/json;charset=utf-8';
                    data = JSON.stringify(options.body);
                }

                for (var k in options.headers) {
                    if (k.toLowerCase() === "content-type" && (utils.isFormData(options.body) || !options.body || isGet)) {
                        // Delete the content-type, Let the browser set it
                        delete options.headers[k];
                    } else {
                        try {
                            // In browser environment, some header fields are readonly,
                            // write will cause the exception .
                            engine.setRequestHeader(k, options.headers[k]);
                        } catch (e) {}
                    }
                }

                var onerror = function onerror(e) {
                    // Call response interceptor
                    if (rpi.onerror) {
                        e = rpi.onerror(e, operate);
                    }
                    return e;
                };

                engine.onload = function () {
                    if (engine.status >= 200 && engine.status < 300 || engine.status === 304) {

                        // The xhr of IE9 has not response filed
                        var response = engine.response || engine.responseText;
                        if ((engine.getResponseHeader("Content-Type") || "").indexOf("json") !== -1
                        // Some third engine implement may transform the response text to json object automatically,
                        // so we should test the type of response before transforming it
                        && !utils.isObject(response)) {
                            response = JSON.parse(response);
                        }

                        var data = { data: response, engine: engine, request: options };
                        // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                        utils.merge(data, engine._response);
                        if (rpi.handler) {
                            // Call response interceptor
                            data = rpi.handler(data, operate) || data;
                        }
                        if (abort) return;
                        _resolve(data);
                    } else {
                        var err = new Error(engine.statusText);
                        err.status = engine.status;
                        err = onerror(err) || err;
                        if (abort) return;
                        _reject(err);
                    }
                };

                engine.onerror = function (e) {
                    // Handle network error
                    var err = new Error(e.msg || "Network Error");
                    err.status = 0;
                    err = onerror(err);
                    if (abort) return;
                    _reject(err);
                };

                engine.ontimeout = function () {
                    // Handle timeout error
                    var err = new Error("timeout [ " + engine.timeout + "ms ]");
                    err.status = 1;
                    err = onerror(err);
                    if (abort) return;
                    _reject(err);
                };
                engine._options = options;
                setTimeout(function () {
                    engine.send(isGet ? null : data);
                }, 0);
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

["get", "post", "put", "delete", "patch"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});

Fly.prototype;

// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ })
/******/ ]);
});
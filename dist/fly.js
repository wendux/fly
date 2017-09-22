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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

    //不覆盖已存在的属性
    merge: function merge(a, b) {
        for (var key in b) {
            //ES5 should use hasOwnProperty()
            if (a[key] !== undefined) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
    }
};

/***/ }),

/***/ 8:
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

            var xhr = new this.engine();
            var promise = new Promise(function (_resolve, _reject) {
                options = options || {};
                var defaultHeaders = {
                    'Content-type': 'application/x-www-form-urlencoded'
                };
                utils.merge(defaultHeaders, _this.config.headers);
                _this.config.headers = defaultHeaders;
                utils.merge(options, _this.config);
                var rqi = _this.interceptors.request;
                var rpi = _this.interceptors.response;
                options.data = data;
                var abort = false;
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

                var responseType = utils.trim(options.responseType || "");
                if (responseType === "stream") {
                    xhr.responseType = responseType;
                }

                if (rqi.handler) {
                    options = rqi.handler(options, operate);
                    if (!options) return;
                }
                if (abort) return;
                url = utils.trim(options.url);
                if (!url && isBrowser) url = location.href;
                var baseUrl = utils.trim(options.baseURL || "");
                if (url.indexOf("http") !== 0) {
                    if (!baseUrl && isBrowser) {
                        var arr = location.pathname.split("/");
                        arr.pop();
                        baseUrl = location.protocol + "//" + location.host + arr.join("/");
                    }
                    if (baseUrl[baseUrl.length - 1] !== "/") {
                        baseUrl += "/";
                    }
                    url = baseUrl + (url[0] === "/" ? url.substr(1) : url);
                    if (isBrowser) {
                        var t = document.createElement("a");
                        t.href = url;
                        url = t.href;
                    }
                }
                xhr.timeout = options.timeout || 0;
                xhr.withCredentials = !!options.withCredentials;
                var isGet = options.method === "GET";
                if (isGet) {
                    if (options.data) {
                        data = utils.formatParams(options.data);
                        url += (url.indexOf("?") === -1 ? "?" : "&") + data;
                    }
                    xhr.open("GET", url);
                } else {
                    xhr.open("POST", url);
                }

                if (["object", "array"].indexOf(utils.type(options.data)) !== -1) {
                    options.headers["Content-type"] = 'application/json;charset=utf-8';
                    data = JSON.stringify(options.data);
                }

                //var isStream=["arraybuffer","blob"].indexOf(utils.type(options.data))!==-1

                for (var k in options.headers) {
                    //删除content-type
                    if (k.toLowerCase() === "content-type" && (utils.isFormData(options.data) || !options.data || isGet)) {
                        delete options.headers[k]; // Let the browser set it
                    } else {
                        xhr.setRequestHeader(k, options.headers[k]);
                    }
                }

                var onerror = function onerror(e) {
                    if (rpi.onerror) {
                        e = rpi.onerror(e, operate);
                    }
                    return e;
                };

                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var response = xhr.responseText;
                        if ((xhr.getResponseHeader("Content-Type") || "").indexOf("json") !== -1) {
                            response = JSON.parse(response);
                        }
                        var data = { data: response, xhr: xhr, request: options };
                        utils.merge(data, xhr._response);
                        if (rpi.handler) {
                            data = rpi.handler(data, operate);
                        }
                        if (abort) return;
                        _resolve(data);
                    } else {
                        var err = new Error(xhr.statusText);
                        err.status = xhr.status;
                        err = onerror(err);
                        if (abort) return;
                        _reject(err);
                    }
                };

                xhr.onerror = function (e) {
                    var err = new Error(e.msg || "Network Error");
                    err.status = 0;
                    err = onerror(err);
                    if (abort) return;
                    _reject(err);
                };

                xhr.ontimeout = function () {
                    var err = new Error("timeout [ " + xhr.timeout + "ms ]");
                    err.status = 1;
                    err = onerror(err);
                    if (abort) return;
                    _reject(err);
                };
                xhr._options = options;
                xhr.send(isGet ? null : data);
            });
            promise.xhr = xhr;
            return promise;
        }
    }, {
        key: "get",
        value: function get(url, data) {
            return this.request(url, data);
        }
    }, {
        key: "post",
        value: function post(url, data) {
            return this.request(url, data, { method: "POST" });
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function wrap(arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//build环境定义全局变量


;
//build环境定义全局变量
KEEP("!build", function () {
    module.exports = Fly;
});

/***/ })

/******/ });
});
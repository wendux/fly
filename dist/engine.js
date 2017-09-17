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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 * source code: https://github.com/wendux/Ajax-hook
 **/

var log = console.log;
var adapter = {
    onRequest: function onRequest(request, responseCallBack) {
        log(request);
        responseCallBack({
            responseText: '{"aa":5}',
            statusCode: 200,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
    }
    //trim
};
var Ajax = function () {
    function Ajax() {
        _classCallCheck(this, Ajax);

        this.requestHeaders = {};
        this.readyState = 0;
        this.timeout = 0; //无超时
        this.responseURL = "";
        self.responseHeaders = {};
        this.onreadystatechange = this.onprogress = this.onload = this.onerror = this.ontimeout = this.onloadend = null;
    }

    _createClass(Ajax, [{
        key: "_changeReadyState",
        value: function _changeReadyState(state) {
            this.readyState = state;
            this.onreadystatechange && this.onreadystatechange();
        }
    }, {
        key: "_end",
        value: function _end() {
            this.onloadend && this.onloadend();
        }
    }, {
        key: "open",
        value: function open(method, url) {
            this.method = method;
            if (!url) {
                url = location.href;
            } else {
                url = url.trim();
                if (url.indexOf("http") !== 0) {
                    //是浏览器环境
                    if (typeof document !== "undefined") {
                        var t = document.createElement("a");
                        t.href = url;
                        url = t.href;
                    }
                }
            }
            this.responseURL = url;
            this._changeReadyState(1);
        }
    }, {
        key: "send",
        value: function send(arg) {
            //log("send", arguments)
            this.requestHeaders.cookie = document.cookie;
            var self = this;
            if (adapter) {
                var request = {
                    method: self.method,
                    url: self.responseURL, //todo url 合并
                    headers: self.requestHeaders,
                    formData: arg
                };
                self._changeReadyState(3);
                var timer;
                if (self.timeout > 0) {
                    timer = setTimeout(function () {
                        if (self.readyState === 3) {
                            self._end();
                            self._changeReadyState(0);
                        }
                    }, self.timeout);
                }
                adapter.onRequest(request, function (response) {
                    //超时了
                    if (self.readyState !== 3) return;
                    clearTimeout(timer);
                    //网络错误
                    self.status = response.statusCode - 0;
                    if (self.status === 0) {
                        self.statusText = response.responseText;
                        self.onerror && self.onerror();
                    } else {
                        var headers = {};
                        for (var field in response.headers) {

                            var value = response.headers[field];
                            var key = field.toLowerCase();
                            //是数组直接赋值
                            if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                headers[key] = value;
                            } else {
                                headers[key] = headers[key] || [];
                                headers[key].push(value);
                            }
                        }
                        var cookies = headers["set-cookie"];
                        if (cookies) {
                            cookies.forEach(function (e) {
                                document.cookie = e.replace(/;\s*httpOnly/g, "");
                            });
                        }
                        self.responseHeaders = headers;
                        //错误码信息,暂且为状态码
                        self.statusText = "" + self.status;
                        if (self.status >= 200 && self.status < 300) {
                            self.response = self.responseText = response.responseText;
                            var contentType = self.getResponseHeader("content-type");
                            //目前只支持json文档自动解析
                            if (contentType && contentType.indexOf('json') !== -1) {
                                self.response = JSON.parse(response.responseText);
                                //log(self.response)
                            }
                            //回调onload
                            self.onload && self.onload();
                        } else {
                            self.onerror && self.onerror();
                        }
                    }
                    self._changeReadyState(4);
                    self._end();
                });
            } else {
                console.error("Ajax require adapter");
            }
        }
    }, {
        key: "setRequestHeader",
        value: function setRequestHeader(key, value) {
            //应该trim一下
            this.requestHeaders[key] = value;
        }
    }, {
        key: "getResponseHeader",
        value: function getResponseHeader(key) {
            return this.responseHeaders[key].toString();
        }
    }, {
        key: "getAllResponseHeaders",
        value: function getAllResponseHeaders() {
            var str = "";
            for (var key in this.responseHeaders) {
                str += key + ":" + this.getResponseHeader(key) + "\r\n";
            }
            return str;
        }
    }, {
        key: "abort",
        value: function abort() {
            this._changeReadyState(0);
            this._end();
        }
    }], [{
        key: "setAdapter",
        value: function setAdapter(requestAdapter) {
            adapter = requestAdapter;
        }
    }]);

    return Ajax;
}();

module.exports = Ajax;

/***/ })
/******/ ]);
});
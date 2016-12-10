/*
 * author: wendu
 * email: 824783146@qq.com
 * source code: https://github.com/wendux/Ajax-hook
 **/
!function (ob) {
    var realXMLHttpRequest;
    ob.hookAjax = function (funs) {
        realXMLHttpRequest = realXMLHttpRequest || XMLHttpRequest
        XMLHttpRequest = function () {
            this.xhr = new realXMLHttpRequest;
            for (var attr in this.xhr) {
                var type = "";
                try {
                    type = typeof this.xhr[attr]
                } catch (e) {}
                if (type === "function") {
                    this[attr] = hookfun(attr);
                } else {
                    Object.defineProperty(this, attr, {
                        get: getFactory(attr),
                        set: setFactory(attr)
                    })
                }
            }
        }

        function getFactory(attr) {
            return function () {
                return this[attr + "_"] || this.xhr[attr]
            }
        }

        function setFactory(attr) {
            return function (f) {
                var xhr = this.xhr;
                var that = this;
                if (attr.indexOf("on") != 0) {
                    this[attr + "_"] = f;
                    return;
                }
                if (funs[attr]) {
                    xhr[attr] = function () {
                        funs[attr](that) || f.apply(xhr, arguments);
                    }
                } else {
                    xhr[attr] = f;
                }
            }
        }

        function hookfun(fun) {
            return function () {
                var args = [].slice.call(arguments)
                if (funs[fun] && funs[fun].call(this, args, this.xhr)) {
                    return;
                }
                this.xhr[fun].apply(this.xhr, args);
            }
        }
        return realXMLHttpRequest;
    }
    ob.unHookAjax = function () {
        if (realXMLHttpRequest)  XMLHttpRequest = realXMLHttpRequest;
        realXMLHttpRequest = undefined;
    }
}(window)
//}(module.exports)

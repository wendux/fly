module.exports = {
    type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase()
    },
    isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object"
        } else {
            return ob && typeof ob === 'object'
        }
    },
    isFormData(val) {
        return (typeof FormData !== 'undefined') && (val instanceof FormData);
    },
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode(val) {
        return encodeURIComponent(val)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    },
    formatParams(data) {
        let str = "";
        let first = true;
        let that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            let encode = that.encode;
            let type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + `%5B${i}%5D`);
                });

            } else if (type == "object") {
                for (let key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },
    // Do not overwrite existing attributes
    merge(a, b) {
        for (let key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key])
            }
        }
        return a;
    }

}

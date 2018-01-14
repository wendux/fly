module.exports = {
    type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase()
    },
    isObject(ob,real) {
       if(real){
          return this.type(ob) === "object"
       } else{
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
        var arr = [];
        for (var name in data) {
            var value = data[name]
            if (this.isObject(value)) {
                value = JSON.stringify(value);
            }
            arr.push(this.encode(name) + "=" + this.encode(value));
        }
        return arr.join("&");
    },

    // Do not overwrite existing attributes
    merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key]
            } else if (this.isObject(b[key],1) && this.isObject(a[key],1)) {
                this.merge(a[key], b[key])
            }
        }
        return a;
    }

}

realXMLHttpRequest = XMLHttpRequest

//return: interrupt if true，这个是onreadystatechange的拦截函数需要你自己实现，返回 true的话将会中指上层回调
function fhook(xhr) {
    console.log(xhr)
}

XMLHttpRequest = function () {
    this.xhr = new realXMLHttpRequest;
    if (!fhook) return this.xhr;
}

function getFactory(s) {
    return function () {return this.xhr[s]}
}

function setFactory(s) {
    return function (f) {
        //只拦截onreadystatechange函数
        if (["onreadystatechange","onload"].indexOf(s)!=-1) {
            var xhr=this.xhr;
            xhr[s] = function (a, b) {
                fhook(xhr) || f(a, b);
            }
        } else {
            xhr[s] = f;
        }
    }
}

function hookfun(s){
    return function(){
        var args = Array.prototype.slice.call(arguments)
        console.log(s,args )
        this.xhr[s].apply(this.xhr, args);
    }
}

for (var s in realXMLHttpRequest.prototype) {
    var type = "";
    try {
        var type = typeof realXMLHttpRequest.prototype[s]
    } catch (e) {

    }
    if (type === "function") {
        XMLHttpRequest.prototype[s] =hookfun(s);
    } else {
        Object.defineProperty(XMLHttpRequest.prototype, s, {
            get: getFactory(s),
            set: setFactory(s)
        })
    }
}

//Object.defineProperty(XMLHttpRequest.prototype,"onreadystatechange",{
//    set:function(s){this._x=s;},
//    get:function(){fhook(this);return this._x;}
//})

//下面是测试代码，可以调用ajax 函数发起一个请求，看看fhook函数的拦截效果

function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        alert("xx")
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}




# Fly.js

Fly.js是一个基于promise的，非常轻量的http网络库，它有如下特点：

1. 同时支持浏览器和node环境。
2. 支持Promise API
3. 支持请求／响应拦截修改
4. 自动转换JSON数据
5. **可以随意切换底层http engine， 在浏览器环境中默认使用XMLHttpRequest**
6. **h5页面内嵌到原生APP中，可以将ajax请求转发到Native，在端上统一发起网络请求、进行cookie管理。**
7. **非常非常轻量**

## 安装

### 使用npm

```shell
npm install flyio
```

### 使用cdn

```javascript
<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
```

### umd

```html
https://unpkg.com/flyio/dist/fly.umd.min.js
```

## 使用

```javascript
var fly=new Fly
engine.setAdapter(adapter)
//定义公共headers
fly.config.headers={xx:5,bb:6,dd:7}
//设置超时
fly.config.timeout=10000;
//设置请求基地址
//fly.config.baseURL=""

//请求拦截器
fly.interceptors.request.use((config,promise)=>{
    //可以通过promise.reject／resolve直接中止请求
    console.log("interceptors.request", config)
    config.headers["X-Tag"]="fly.js";
    return config;
})

//响应拦截器
fly.interceptors.response.use(
    (response,promise) => {
        console.log("interceptors.response", response)
        return response.data
    },
    (err,promise) => {
        //promise.resolve("ssss")
    }
)
//get请求
fly.get("../package.json",{aa:8,bb:9,tt:{xx:5}}).then((d) => {
    console.log("get result:",d)
}).catch((e) => console.log("error", e))

//post请求
fly.post("../package.json",{aa:8,bb:9,tt:{xx:5}}).then((d) => {
    console.log("post result:",d)
}).catch((e) => console.log("error", e))

//直接调用ajax函数发起post请求
fly.ajax("../package.json",{hh:5},{
    method:"post"
}).then(d=>{
    console.log("ajax result:",d)
})
```



## Http engine

Http engine就是真正发起http请求的引擎，这在浏览器中一般都是XMLHttpRequest。而在node环境中，开发者可以使用任何自己喜欢的网络库，fly 中提供了engine模块，开发者只需要实现一个adapter即可. 下面是一个在app内嵌网页中，通过fly engine将所有请求重定向到Native中的例子。

```javascript
var engine = require("../src/engine")
var adapter = require("../src/adapter/dsbridge")
var  Fly=require("../src/fly")
var fly = new Fly(engine)
//使用dsbridge适配器，将会使fly实例发起的所有ajax请求通过dsbridge重定向到Native上
engine.setAdapter(adapter) 

//发起网络请求
fly.get()....
```



## 下面的适配器在京锣密鼓的开发中....

### 其它javascript bridge的 adapter

```javascript
var adapter = require("../src/adapter/webviewjsbridge")
engine.setAdapter(adapter) 
```

所有的jsbridge，都只需要实现一个适配器，便可将h5与端打通，是不是很酷。。



### node adapter 

在node 中也可以使用哦。

```javascript
var engine = require("../src/engine")
var adapter = require("../src/adapter/node")
var  Fly=require("../src/fly")
var fly = new Fly(engine)
engine.setAdapter(adapter) 

//node环境中发起网络请求
fly.get()....
```


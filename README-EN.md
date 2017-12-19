[![fly.js](https://github.com/wendux/fly/raw/master/fly.png)](https://wendux.github.io/dist/#/doc/flyio/readme)
[![npm version](https://img.shields.io/npm/v/flyio.svg)](https://www.npmjs.org/package/flyio)
[![build status](https://travis-ci.org/wendux/fly.svg?branch=master)](https://travis-ci.org/wendux/fly)


### Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ✔                                        | ✔                                        | ✔                                        | ✔                                        | ✔                                        | > 8                                      |
## Fly

Supporting request forwarding and Promise based HTTP client for all JavaScript runtimes.

## Features

1. Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
2. Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser，**light-weight and very light-weight** 
3. Make http requests from node.js
4. Make http requests from WeChat applet
5. Supports  request and response interceptors。
6. Automatic transforms for JSON data。
7. Supports switching the underlying Http Engine, easy to adapt to various JavaScript Runtime.
8. Supports global Ajax interception on browser
9. Supports request forwarding in hybrid applications
10. Easy to customize, disassemble and assemble



## Positioning & target

Fly positioning is the ultimate solution for Javascript http requests. That is to say, in any environment that can execute Javascript, as long as it has the ability to access the network, Fly can run on it and provide unified APIs. At the same time, keep lightweight on the browser side.



## Documentation

You can find the Fly documentation [on the offical website](https://wendux.github.io/dist/#/language).

[中文文档](https://wendux.github.io/dist/#/doc/flyio/readme)

## Installing

### Using npm

```shell
npm install flyio
```

### Using CDN

```javascript
<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
```

### UMD

```http
https://unpkg.com/flyio/dist/umd/fly.umd.min.js
```



## Example

The following example, if not specified, can be executed in both browsers and node runtimes.

### Performing a `GET` request

```javascript
var fly=require("flyio")
// Make a request for a user with a given ID,  and the parameter is passed directly in URL
fly.get('/user?id=133')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// The parameter is passed by a object
fly.get('/user', {
      id: 133
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Performing a `POST` request

```javascript
fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Performing multiple concurrent requests

```javascript
function getUserRecords() {
  return fly.get('/user/133/records');
}

function getUserProjects() {
  return fly.get('/user/133/projects');
}

fly.all([getUserRecords(), getUserProjects()])
  .then(fly.spread(function (records, projects) {
    // Both requests are now complete
  }))
  .catch(function(error){
    console.log(error)
  })
```

### Performing the request by `request`

```javascript
fly.request("/test",{hh:5},{
    method:"post", 
    timeout:5000 // Set timeout to 5 seconds
 })
.then(d=>{ console.log("request result:",d)})
.catch((e) => console.log("error", e))
```



### Sending `URLSearchParams`

```javascript
const params = new URLSearchParams();
params.append('a', 1);
fly.post("",params)
.then(d=>{ console.log("request result:",d)})
```

> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/WebReflection/url-search-params) available (make sure to polyfill the global environment).

### Sending `FormData`

```javascript
 var formData = new FormData();
 var log=console.log
 formData.append('username', 'Chris');
 fly.post("../package.json",formData).then(log).catch(log)
```

> Note that `FormData` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/form-data/form-data) available (make sure to polyfill the global environment).  And there are some differences on the way to support formData in node environment. Please click [here](#/doc/flyio/node) for more details

### Requesting Stream

```javascript
fly.get("/Fly/v.png",null,{
	responseType:"arraybuffer"
}).then(d=>{
  //d.data is a ArrayBuffer instance
})
```

> In browser, the value of responseType can be one of "arraybuffer" or "blob". In node, you can just set it as "stream"
>

## interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```javascript

// Add a request interceptor
fly.interceptors.request.use((config,promise)=>{
    // Do something before request is sent
    config.headers["X-Tag"]="flyio";
    // Complete the request with custom data
    // promise.resolve("fake data")
    return config;
})

// Add a response interceptor
fly.interceptors.response.use(
    (response,promise) => {
        // Do something with response data .
        // Just return the data field of response
        return response.data
    },
    (err,promise) => {
      // Do something with response error
        //promise.resolve("ssss")
    }
)
```

If you may need to remove an interceptor later,    just set it to null.

```javascript
fly.interceptors.request.use(null)
fly.interceptors.response.use(null,null)
```



## Node

Whether in browser environment or in Node environment, Fly provides a unified Promise API in the upper layer. This means that, regardless of whether you are in web development or node development, you can perform HTTP requests in the same way. However, because of the difference of node and browser environment, under the environment of Node, Fly in addition to basic API support, also provides some enhancements to the API, the API mainly involves the file download, file upload,  HTTP agents and other powerful features, please refer to [Node enhanced API](https://wendux.github.io/dist/#/doc/flyio-en/node) .



## Error handling

If  the request fails, `catch`  will be called;  the error object  is an instance of Error, and it has two fields :

```javascript
{
  message:"Not Find 404", //error description
  status:404 // error code
}
```

| Code  | Description                              |
| ----- | ---------------------------------------- |
| 0     | network error                            |
| 1     | timeout                                  |
| 2     | The file was downloaded successfully, but the save failed. **This error only occurred in the node environment** |
| >=200 | http status code                         |



## Request configuration options

**Configurable options**：

```javascript
{
 // `method` is the request method to be used when making the request
  method: 'get', // default
  // `headers` are custom headers to be sent
  headers:{},
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of fly to pass relative URLs
  // to methods of that instance.   
  baseURL:"",
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.  
  timeout:0,  //default
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default
}
```

Configuration supports **instance level configuration** and **single request configuration**

### Instance level

Instance level configuration can be applied to all requests initiated by the current Fly instance:

```javascript
// Add common headers
fly.config.headers={xx:5,bb:6,dd:7}
// Set timeout
fly.config.timeout=10000;
// Set base url
fly.config.baseURL="https://wendux.github.io/"
```

### Single request 

Single request configuration is valid only once:

```javascript
fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //超时设置为5s
})
```

> If the single configuration and the instance configuration conflict, the single request configuration is preferred .

## API

#### `fly.get(url, data, options)`

#### `fly.post(url, data, options)`

In browser environment, the type of data can be:

```shell
String|Json|Object|Array|Blob|ArrayBuffer|FormData
```

`options` is the  request configuration。



#### `fly.request(url, data, options)`

When you use this API, you should explicitly specify  the method of options, and the default method is `get`

```javascript
// Perform a get request
fly.request("/user/8" null, {method:"get"})
// Perform a delete request
fly.request("/user/8/delete", null, {method:"delete"})
// Perform a put request
fly.request("/user/register", {name:"doris"}, {method:"PUT"})
......
```

This API is suitable for use in RESTful API scenarios. For convenience, the corresponding alias methods are provided
**alias**

`fly.put(url, data, options)`

`fly.delete(url,data,options)`

`fly.patch(url,data,options)`

### Concurrency

Helper functions for dealing with concurrent requests.

##### `axios.all([])`   

##### `axios.spread(callback)`

The parameter of all is an array of `promise`,  `then` will be called only when all requests are successful, and` catch` will be called as long as one fails.

## Creating  an instance 

You can create a new instance of Fly , and then apply different configurations:

```javascript
// Notice require path is  "flyio/dist/npm/fly"
var  Fly=require("flyio/dist/npm/fly") 
var nFly=new Fly();
// Apply different configurations
nFly.config.timeout=15000
nfly.interceptors.request.use(...)
```



## Http Engine

Fly introduces the concept of Http Engine, and Http Engine is the engine that really initiates http requests. This is typically XMLHttpRequest in browser environment, and in Node environments, any module or library that can initiate a network request can be implemented. Fly can switch the Http Engine freely. In fact, Fly is implemented by switching Http Engine, supporting both the browser environment and the Node environment.However, Http Engine is not limited to Node and browser environment, also can be Android, IOS, electron and so on, it is because of these, Fly has a very unique and powerful feature "request forwarding". Based on the request forwarding, we can implement some useful functions, such as redirecting all the HTTP requests of the hybrid application to Native, and then complete the network request on natvie side.  The benefit of this is that  we can perform unified certificate validation, cookie management, access control and son on on natvie.  More details click here  [http engine](https://wendux.github.io/dist/#/doc/flyio-en/engine) .

## Global Ajax interception

In browsers, you can intercept global Ajax requests by replacing XMLHttpRequest with Fly engine, regardless of what network library the upper layer uses.  More details click here [Ajax hook](https://wendux.github.io/dist/#/doc/flyio-en/hook)


## Use in WeChat applet

The JavaScript runtime of   WeChat applets  is different from browser and node.  you can easily use fly in WeChat applet, More details click here  [Using fly in WeChat applet ](https://wendux.github.io/dist/#/doc/flyio-en/wx) .

## Size

In  browser environment, the size of a library is very important. In this regard, Fly is doing a good job, on the on hand  Fly maintains the powerful function, on the other hand, Fly control its body to the minimum. Min is only about 4.6K, and GZIP is less than 2K after compression, and the volume is 1/4 of Axios。


## Finally

Welcome star 。





[![fly.js](https://github.com/wendux/fly/raw/master/fly.png)](https://wendux.github.io/dist/#/doc/flyio/readme)

[![npm version](https://img.shields.io/npm/v/flyio.svg)](https://www.npmjs.org/package/flyio)
[![build status](https://travis-ci.org/wendux/fly.svg?branch=master)](https://travis-ci.org/wendux/fly)
[![coverage](https://img.shields.io/codecov/c/github/wendux/fly/master.svg)](https://codecov.io/github/wendux/fly?branch=master)
[![size](https://img.shields.io/github/size/wendux/fly/dist/fly.min.js.svg)](https://unpkg.com/flyio@0.3.1/dist/fly.min.js)
![platform](https://img.shields.io/badge/platforms-All%20JavaScript%20Runtimes-blue.svg)

## Fly.js

Supporting request forwarding and Promise based HTTP client for all JavaScript runtimes.

Chinese documentation : [中文文档](https://github.com/wendux/fly/blob/master/README.md)



### Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ✔                                        | ✔                                        | ✔                                        | ✔                                        | ✔                                        | > 8                                      |

### Other Platforms  Support
<table>
    <tbody>
    <tr>
        <td align="center" valign="middle">
            <a href="https://nodejs.org/">
                <img  src="https://github.com/wendux/fly/raw/master/imgs/node.png" alt="node logo">
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://mp.weixin.qq.com/">
                <img  src="https://github.com/wendux/fly/raw/master/imgs/mp.png" alt="Mini Program logo">
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="http://facebook.github.io/react-native/">
                <img  src="https://github.com/wendux/fly/raw/master/imgs/rn.png" alt="mpvue logo">
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="http://weex.apache.org/">
                <img  src="https://github.com/wendux/fly/raw/master/imgs/weex.png" alt="weex logo">
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://www.quickapp.cn/">
                <img  src="https://github.com/wendux/fly/raw/master/imgs/hp.png" alt="quick app logo">
            </a>
        </td>
    </tr>
    </tbody>
</table>  

Currently the platforms that fly.js supported include  [Node.js](https://nodejs.org/) 、[WeChat Mini Program](https://mp.weixin.qq.com/cgi-bin/wx) 、[Weex](http://weex.apache.org/) 、[React Native](http://facebook.github.io/react-native/) 、[Quick App](https://www.quickapp.cn/) and the browers, all  JavaScript runtimes of these are different. More platforms  are supporting...

## Features

1. Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
2. Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser，**light-weight and very light-weight**
3. Supports  various  JavaScript runtimes
4. Supports  request and response interceptors。
5. Automatic transforms for JSON data。
6. Supports switching the underlying Http Engine, easy to adapt to various JavaScript Runtime.
7. Supports global Ajax interception on browser
8. Supports request forwarding in hybrid applications




## Positioning & target

Fly.is  locates to be the ultimate solution for Javascript http requests. That is to say, in any environment that can execute Javascript, as long as it has the ability to access the network, Fly can run on it and provide unified APIs. At the same time, keep lightweight on the browser side.



## Documentation

You can find the Fly documentation [on the offical website](https://wendux.github.io/dist/#/language).

[中文文档](https://wendux.github.io/dist/#/doc/flyio/readme)

## Installing

Using npm 

```shell
npm install flyio
```

Using CDN （on browsers）

```javascript
<script src="https://cdn.jsdelivr.net/npm/flyio/dist/fly.min.js"></script>
```

UMD （on browsers）

```http
https://cdn.jsdelivr.net/npm/flyio/dist/umd/fly.umd.min.js
```



## Require flyio

The entry files of  different JavaScript Runtimes may be different, you can refer on the below，
but the entries of  Browsers, Node, and React Native are the same。each requirement  ways  of these platforms are as follows:

1. Requiring On browsers、Node、React Native

   ```javascript
   //for Browsers, Node, and React Native
   var fly=require("flyio")
   ```

   The above method requires the default instance of Fly, and you can also create an Fly instance by yourself:

   ```javascript
   // for browsers and React Native
   var Fly=require("flyio/dist/npm/fly")
   // for Node
   //var Fly=require("flyio/src/node")
   var fly=new Fly;
   ```

2. Requiring on WeChat Mini Program

   ```javascript
   var Fly=require("flyio/dist/npm/wx") 
   var fly=new Fly
   ```

   If your  project does not use NPM to manage dependencies, you can download the source code directly to your project 。The download links are [wx.js](https://github.com/wendux/fly/tree/master/dist/npm/wx.js) or  [wx.umd.min.js](https://github.com/wendux/fly/tree/master/dist/umd/wx.umd.min.js)  . Download any one, save it to your project directory (assuming named "lib") , and then requiring:

   ```javascript
   var Fly=require("../lib/wx") 
   var fly=new Fly; 
   ```

3. Requiring on Quick App

   On [Quick App](https://www.quickapp.cn/), Fly relies on the `fetch` module, which needs to be defined in the manifest.json first:

   ```java
     "features": [
        ...
       {"name": "system.fetch"}
     ]
   ```

   And then create Fly instance:

   ```javascript
    var fetch = require("@system.fetch")
    var Fly=require("flyio/dist/npm/hap")
    var fly=new Fly(fetch)
   ```

4. Requiring on Weex

   ```javascript
   var Fly=require("flyio/dist/npm/weex")
   var fly=new Fly
   ```

After the requirement, you can make the global configuration and add the interceptor to `fly` , and peform network request with `fly`.

## Example

The following example, if not specified, can be executed in all JavaScript Runtimes.

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

### `POST` request with Url params

```javascript
fly.get("../package.json", "xxx=5", {
        params: {
            c: 1
        }
    }
)
```

The final url is "package.json?c=1&xxx=5".

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
fly.interceptors.request.use((request)=>{
    // Do something before request is sent
    request.headers["X-Tag"]="flyio";
  	console.log(request.body)
    // Complete the request with custom data
    // return Promise.resolve("fake data")
})

// Add a response interceptor
fly.interceptors.response.use(
    (response) => {
      // Do something with response data .
      // Just return the data field of response
      return response.data
    },
    (err) => {
      // Do something with response error
      //return Promise.resolve("ssss")
    }
)
```

The structures of the `request ` object in request interceptor.

```javascript
{
  baseURL,  //base url
  body, // request parameters
  headers, //custom request headers
  method, // http request method
  timeout, // request time
  url, // request url (or relative path)
  withCredentials, // determine whether sending thirdparty cookies in cross-domain request
  ... // custom field defined in options
}
```

The structures of the `response` object in response interceptor.

```javascript
{
  data, //response data
  engine, //http engine,In browser,it's a instance of XMLHttpRequest.
  headers, //response headers
  request  //the origin request object
}
```

### Remove interceptors 

If you may need to remove an interceptor later,    just set it to null.

```javascript
fly.interceptors.request.use(null)
fly.interceptors.response.use(null,null)
```

### Perform  an async task in  interceptors

Now,  you can perform  async task in interceptors !

Let's see an example:

because of security reasons, we need all the requests to set up a csrfToken in the header, if csrfToken does not exist, we need to request a csrfToken first, and then perform the network request, because the request csrfToken progress is asynchronous, so we need to execute  this async request in request interceptor. the code is as follows:

```javascript
var csrfToken="";
var tokenFly=new Fly();
var fly=new Fly();
fly.interceptors.request.use(function (request) {
    //if csrfToken does not exist, we need to request a csrfToken first
    if(!csrfToken) {
         // locking the current instance, let the incomming request task enter a 
         // queue before they enter the request interceptors.
         fly.lock();
         //Using  another fly instance to request csrfToken.
         //If use the same fly instance, there may lead a infinite loop:
         //(The request will go to the interceptor first, and then
         //enter the interceptor again when launching the new request 
         //in the interceptor....)
         return tokenFly.get("/token").then((d)=>{
            request.headers["csrfToken"]=csrfToken=d.data.data.token;
            //only return the origin `request` object can make the http request continue.
            // otherwise, the return data will be teated as "response" data.
            return request 
          }).finally(()=>{
           //fly.clear(); //clear the request queue
           // unlock the current instance, flush the request queue.   
           fly.unlock()
         })  
        
    }else {
        request.headers["csrfToken"]= csrfToken;
        //This line can be omitted. 
        //If the interceptor doesn't return value, `request` will be used by default.
        return request 
    }
})
```

**Note**: 

1. The current fly instance will be locked  when call `fly.lock()` . Once  the fly instance is locked,  the incomming request task maked by it will be hang up and enter a queue before they enter the request interceptors, you can call `fly.unlock()` to continue the requests or call `fly.clear()` to cancel the requests in the queue.
2. **Only when you return the `request` object  passed by interceptor at the final , the origin http request  will be continued**.  

And you can also make an async task in the **response** interceptor. More information about interceptors and examples refer to [flyio interceptor](https://wendux.github.io/dist/#/doc/flyio/interceptor).

## Error handling

If  the request fails, `catch`  will be called;  the error object's fields as follows :

```javascript
{
  message:"Not Find 404", //error description
  status:404, // error code
  request:{...}, //the request info
  response:{...}, //the error response,
  engine:{}, // The Http engine, it's a instance of XmlHttpRequest in browser.
}
```

| Code  | Description                              |
| ----- | ---------------------------------------- |
| 0     | network error                            |
| 1     | timeout                                  |
| 2     | The file was downloaded successfully, but the save failed. **This error only occurred in the node environment** |
| >=200 | http status code                         |

**Example**

```javascript
fly.get('/user/12345')
  .catch(function (error) {
    console.log('Error', error.message);
    console.log('Error engine:', error.engine)
    // The request was made but no response was received
    // `error.request` holds the request info.
    console.log('Error request info:',error.request);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and 304
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.headers);
    }
  });
```

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
  // `parseJson` indicates whether or not it is  automatically converted response 
  //  data , the Content-Type of which is application/json, to JSON object,     
  parseJson:true,
  //Common URL params
  params:{}     
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
// Common URL params
fly.config.params={"token":"testtoken"}
```

### Single request configuration

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

##### `fly.all([])`
##### `fly.spread(callback)`

The parameter of all is an array of `promise`,  `then` will be called only when all requests are successful, and` catch` will be called as long as one fails.

## Using application/x-www-form-urlencoded format

By default, fly serializes JavaScript objects to `JSON`. To send data in the `application/x-www-form-urlencoded` format instead, you can use one of the following options.

### By specifying `content-type` request header

When you specify  `content-type` value as "application/x-www-form-urlencoded", fly will encode the request data automatically, for example：

```javascript
fly.post("../package.json",{aa:8,bb:9,tt:{xx:5}},{headers:{
    "content-type":"application/x-www-form-urlencoded"
}})
.then(console.log)
```

This method is universal, which means that it can work well in any JavaScript runtime. There are also some other ways for some specific platforms:

### Other ways

#### Browser

In a browser, you can use the [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API as follows:

```js
var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
fly.post('/foo', params);
```

> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/WebReflection/url-search-params) available (make sure to polyfill the global environment).

Alternatively, you can encode data using the [`qs`](https://github.com/ljharb/qs) library:

```js
var qs = require('qs');
fly.post('/foo', qs.stringify({ 'bar': 123 }));
```

#### Node.js

In node.js, you can use the [`querystring`](https://nodejs.org/api/querystring.html) module as follows:

```js
var querystring = require('querystring');
fly.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

You can also use the [`qs`](https://github.com/ljharb/qs) library.



## Promises

Fly depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## TypeScript
fly includes [TypeScript](http://typescriptlang.org) definitions.
```typescript
import fly from "flyio"
fly.get('/user?ID=12345');
```
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

## Using in Node

Whether in browser environment or in Node environment, Fly provides a unified Promise API in the upper layer. This means that, regardless of whether you are in web development or node development, you can perform HTTP requests in the same way. However, because of the difference of node and browser environment, under the environment of Node, Fly in addition to basic API support, also provides some enhancements to the API, the API mainly involves the file download, file upload,  HTTP agents and other powerful features, please refer to [Node enhanced API](https://wendux.github.io/dist/#/doc/flyio-en/node) .


## Size

In  browser environment, the size of a library is very important. In this regard, Fly is doing a good job, on the on hand  Fly maintains the powerful function, on the other hand, Fly control its body to the minimum. Min is only about 4.6K, and GZIP is less than 2K after compression, and the volume is 1/4 of Axios。

## Project structure

Learn the project structure of Fly.js please refer to : [Fly.js source structure](https://wendux.github.io/dist/#/doc/flyio-en/files) 


## Finally

Welcome stars 。





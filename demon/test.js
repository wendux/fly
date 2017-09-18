/**
 * Created by du on 16/12/10.
 */
var engineWrapper = require("../src/engine-wrapper")
var adapter = require("../src/adapter/dsbridge")
var  Fly=require("../src/fly")
engineWrapper.setAdapter(adapter)

//由nfly发起的网络请求将会全部通过dsbridge转发到端上
window.nfly= new Fly(engineWrapper)

//由fly发起的请求将会使用浏览器默认XMLHttpRequest
window.fly=new Fly

//定义公共headers
fly.config.headers={xx:5,bb:6,dd:7}

fly.interceptors.request.use((config,promise)=>{
    //可以通过promise.reject／resolve直接中止请求
    console.log("interceptors.request", config)
    config.headers["X-Tag"]="fly.js";
    return config;
})

fly.interceptors.response.use(
    (response,promise) => {
        console.log("interceptors.response", response)
        return response.data
    },
    (err,promise) => {
        //promise.resolve("ssss")
    }
)

fly.get("../package.json",{aa:8,bb:9,tt:{xx:5}}).then((d) => {
    console.log("get result:",d)
}).catch((e) => console.log("error", e))

fly.post("../package.json",{aa:8,bb:9,tt:{xx:5}}).then((d) => {
    console.log("post result:",d)
}).catch((e) => console.log("error", e))

fly.ajax("../package.json",{hh:5},{
    method:"post"
}).then(d=>{
    console.log("ajax result:",d)
})




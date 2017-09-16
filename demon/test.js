/**
 * Created by du on 16/12/10.
 */
var Ajax = require("../src/ajaxhook")
var adapter = require("../src/adapter/dsbridge")
var  Fly=require("../src/fly")
window.axio=new Fly
window.fly= new Fly(Ajax)

//Ajax.setAdapter(adapter)
//window.XMLHttpRequest = Ajax

fly.interceptors.request.use((config)=>{
    console.log("interceptors.request", config)
    config.headers.xx=8;
    return config;
})

fly.interceptors.response.use(
    (response,promise) => {
        return response.data
    },
    (err,promise) => {
      promise.resolve("ssss")
    }
)

fly.get("").then((d) => {
    //console.log(d)
}).catch((e) => console.log("error", e))


// $.get("https://www.baidu.com").done(function(d){
//  alert(d);
// }).fail(function (e) {
//        alert("error")
//     }
// )




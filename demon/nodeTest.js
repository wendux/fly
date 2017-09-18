var fly = require("../src/node")
var log=console.log;

//设置超时
fly.config.timeout=5000;

//设置基地址
fly.config.baseURL="http://localhost:63341/Fly/"


//get请求
fly.get("package.json",{wd:"xxx"}).then(d=>{
    console.log("get请求成功",d.data)
}).catch((e)=>{
    log(`get请求失败，错误码：${e.status}, 错误信息：${e.message}`);
})

//post请求
fly.post("http://localhost/ds/test",{xx:"xxx",aa:{bb:5}}).then(d=>{
    console.log("post请求成功",d.data)
}).catch((e)=>{
    log(`post请求失败，错误码：${e.status}, 错误信息：${e.message}`);
})
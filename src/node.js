
var Fly = require("../dist/fly")
var EngineWrapper = require("../dist/engine-wrapper")
var adapter = require("./adapter/node")
var utils = require("./utils")
var engine = EngineWrapper(adapter)
var fs = require("fs")
var path= require("path")
var fly = new Fly(engine)
var request=require("request")
var rq = request.defaults({jar: true})

//设置http插件
fly.$http=rq;

//下载api
fly.download = function (url, savePath, params = null,options) {
    return fly.request(url, params,utils.merge({responseType: "stream"},options))
        .then(d => {
           return new Promise((resolve,reject)=> {
                fs.writeFile(savePath, d.data,(err)=>{
                    if(!err) {
                        resolve({size:d.data.length,path:path.resolve(savePath)})
                    }else{
                        err.status=2
                        reject(err)
                    }
                })
            })
        }).catch(e=>{
           return Promise.reject(e)
        })
}

//上传api
fly.upload= function (url,formData,options) {
  return fly.post(url,null,utils.merge({formData},options))
}

module.exports = fly
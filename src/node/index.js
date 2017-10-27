var Fly = require("../../dist/npm/fly")
var EngineWrapper = require("../../dist/npm/engine-wrapper")
var adapter = require("../adapter/node")
var utils = require("../utils/utils")
var nodeEngine = EngineWrapper(adapter)
var fs = require("fs")
var path= require("path")
var request=require("request")
var rq = request.defaults({jar: true})
Object.assign(Fly.prototype,{

    // Http plugin
    "$http":rq ,

    // File download API
    download(url, savePath, params = null,options) {
        return this.request(url, params,utils.merge({responseType: "stream"},options))
            .then(d => {
                return new Promise((resolve,reject)=> {
                    fs.writeFile(savePath, d.data,(err)=>{
                        if(!err) {
                            resolve({size:d.data.length,path:path.resolve(savePath)})
                        }else{
                            // Failed to save file
                            err.status=2
                            reject(err)
                        }
                    })
                })
            }).catch(e=>{
                return Promise.reject(e)
            })
    },

    // File upload API
    upload(url,formData,options) {
        return this.post(url,null,utils.merge({formData},options))
    }
})

module.exports = function (engine) {
    return new Fly(engine||nodeEngine)
}
let Fly = require("../../dist/npm/fly")
let EngineWrapper = require("../../dist/npm/engine-wrapper")
let adapter = require("../adapter/node")
let utils = require("../utils/utils")
let nodeEngine = EngineWrapper(adapter)
let fs = require("fs")
let path = require("path")
let request = require("request")
let rq = request.defaults({jar: true})
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

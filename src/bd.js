//百度小程序入口
const _Fly = require("./fly")
const EngineWrapper = require("./engine-wrapper")
const adapter = require("./adapter/bd")
const bdEngine = EngineWrapper(adapter)
module.exports=function (engine) {
    return new _Fly(engine || bdEngine);
}

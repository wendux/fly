//微信小程序入口
var  Fly=require("./fly")
var EngineWrapper = require("./engine-wrapper")
var adapter = require("./adapter/wx")
var wxEngine = EngineWrapper(adapter)
module.exports=function (engine) {
    return new Fly(engine||wxEngine);
}
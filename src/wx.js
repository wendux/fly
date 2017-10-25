//微信小程序入口
var  Fly=require("../dist/fly")
var EngineWrapper = require("../dist/engine-wrapper")
var adapter = require("../dist/adapter/wx")
var wxEngine = EngineWrapper(adapter)
module.exports=function (engine) {
    return new Fly(engine||wxEngine);
}
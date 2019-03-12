//支付宝小程序入口
const _Fly = require("./fly")
const EngineWrapper = require("./engine-wrapper")
const adapter = require("./adapter/ap")
const aliPayEngine = EngineWrapper(adapter)
module.exports = function (engine) {
    return new _Fly(engine || aliPayEngine);
}

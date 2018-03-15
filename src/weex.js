//weex entry
var Fly = require("./fly")
var EngineWrapper = require("./engine-wrapper")
var adapter = require("./adapter/weex")
var weexEngine = EngineWrapper(adapter)
module.exports = function (engine) {
    return new Fly(engine || weexEngine);
}
//weex entry
const Fly = require("./fly")
const EngineWrapper = require("./engine-wrapper")
const adapter = require("./adapter/weex")
const weexEngine = EngineWrapper(adapter)
module.exports = function (engine) {
    return new Fly(engine || weexEngine);
}

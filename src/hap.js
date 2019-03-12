//quick app entry
const Fly = require("./fly")
const EngineWrapper = require("./engine-wrapper")
const adapter = require("./adapter/hap")
module.exports = function (fetch) {
    let hapEngine = EngineWrapper(adapter(fetch))
    return new Fly(hapEngine);
}

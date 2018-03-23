//quick app entry
var Fly = require("./fly")
var EngineWrapper = require("./engine-wrapper")
var adapter = require("./adapter/hap")
module.exports = function (fetch) {
    var hapEngine = EngineWrapper(adapter(fetch))
    return new Fly(hapEngine);
}
/**
 * Created by rocky on 2019/1/9.
 * <author> wjl19890427@hotmail.com
 * https://github.com/rockywu
 * 支付宝小程序入口
 */
var _Fly = require("./fly")
var EngineWrapper = require("./engine-wrapper")
var adapter = require("./adapter/ap")
var apEngine = EngineWrapper(adapter)
module.exports=function (engine) {
    return new _Fly(engine || apEngine);
}

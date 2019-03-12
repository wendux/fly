let pkg = require('./../../package.json');
let req = require("request");
module.exports = function (request, responseCallBack) {
    //自动管理cookie
    let config = {jar: true, proxy: request.proxy}
    let rq = req.defaults(config)
    let headers = request.headers;
    if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'fly/' + pkg.version;
    }
    //支持gzip
    request.gzip = true;
    if (request.hasOwnProperty("timeout") && request.timeout < 1) {
        //use request lib default timeout
        delete request.timeout;
    }
    let ret = {
        statusCode: 0
    }
    if (request.responseType === "stream") {
        delete request.responseType;
        request.encoding=null;
    }

    rq(request, function (error, response, body) {
        if (error) {
            ret.statusMessage = error.message
        } else {
            ret.statusCode = response.statusCode
            ret.responseText = body;
            ret.headers = response.headers;
            ret.statusMessage = response.statusMessage;
            ret.response = response;
        }
        responseCallBack(ret)
    })

}




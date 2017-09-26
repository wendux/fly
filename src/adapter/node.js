
var pkg = require('./../../package.json');
var request = require("request");
//自动管理cookie
var rq = request.defaults({jar: true})

module.exports = function (request, responseCallBack) {
    var headers = request.headers;
    if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'fly/' + pkg.version;
    }
    //支持gzip
    request.gzip = true;
    if (request.hasOwnProperty("timeout") && request.timeout < 1) {
        //use request lib default timeout
        delete request.timeout;
    }
    var ret = {
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




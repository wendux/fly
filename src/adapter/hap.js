//hap adapter
module.exports = function (fetch) {
    return function (request, responseCallback) {
        request.data = request.body;
        request.header = request.headers;
        request.complete = (ret) => {
            if (typeof ret !== "object") {
                ret = {
                    code: 0,
                    msg: ret
                }
            }
            responseCallback({
                statusCode: ret.code || 0,
                responseText: ret.data,
                headers: ret.headers,
                statusMessage: ret.msg
            })
        }
        fetch.fetch(request)
    }
}
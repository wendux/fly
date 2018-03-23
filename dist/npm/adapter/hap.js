//hap adapter
module.exports = function (fetch) {
    return function (request, responseCallback) {
        request.data = request.body;
        request.header = request.headers;
        request.complete = (ret) => {
            responseCallback({
                statusCode: ret.code,
                responseText: ret.data,
                headers: ret.headers
            })
        }
        fetch.fetch(request)
    }
}
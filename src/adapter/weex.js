//weex adapter
let stream = weex.requireModule('stream');
module.exports = function (request, responseCallback) {
    if (!request.body) {
        delete request.body;
    }
    stream.fetch(request, function (res) {
        responseCallback({
            statusCode: res.status || 0,
            responseText: res.data,
            headers: res.headers,
            statusMessage: res.statusText
        })
    });
}

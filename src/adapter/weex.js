//weex adapter
let stream = weex.requireModule('stream');
module.exports = function (request, responseCallback) {
    if (!request.body) {
        delete request.body;
    }
    stream.fetch(request, function (res) {
        if (res.ok) {
            responseCallback({
                statusCode: res.status,
                responseText: res.data,
                headers: res.headers,
                statusMessage: res.statusText
            })
        } else {
            responseCallback({
                statusCode: res.status || 0,
                statusMessage: res.statusText
            })
        }
    });
}

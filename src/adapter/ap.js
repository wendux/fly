//支付宝小程序适配器
const statusList = {
    11: '无权跨域',
    12: '网络出错',
    13: '超时',
    14: '解码失败',
    19: 'HTTP错误'
}
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: 'text',
        header: request.headers,
        data: request.body || {},
        timeout: request.timeout || 20000,
        success(res) {
            responseCallback({
                statusCode: res.status,
                responseText: res.data,
                statusHeaders: res.headers
            })
        },
        fail(res) {
            responseCallback({
                statusCode: res.status || 0,
                responseText: res.data,
                statusHeaders: res.headers,
                errMsg: statusList[res.status] || ""
            })
        }
    }
    my.httpRequest(con)
}

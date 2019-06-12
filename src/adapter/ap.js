//支付宝小程序适配器
const statusList = {
    11: '无权跨域',
    12: '网络出错',
    13: '超时',
    14: '解码失败',
    19: 'HTTP错误'
}
module.exports = function (request, responseCallback) {
    let con = {
        method: request.method,
        url: request.url,
        dataType: 'text',
        headers: request.headers,
        data: request.body || {},
        timeout: request.timeout || 20000,
        success(res) {
            responseCallback({
                statusCode: res.status,
                responseText: res.data,
                headers: res.headers
            })
        },
        fail(res) {
            responseCallback({
                statusCode: res.status || 0,
                responseText: res.data,
                headers: res.headers,
                errMsg: statusList[res.status] || ""
            })
        }
    }
    if (my.request) {
        my.request(con)
    } else {
        my.httpRequest(con)
    }
    // 支付宝端旧接口 my.httpRequest 将被废弃，请使用my.request 来代替。钉钉端目前尚未支持my.request，请继续使用 my.httpRequest。基础库 1.11.0 或更高版本
}

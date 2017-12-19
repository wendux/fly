//微信小程序适配器
module.exports=function(request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType||"text",
        header: request.headers,
        data: request.body||{},
        success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            })
        },
        fail(res) {
            responseCallback({
                statusCode: res.statusCode||0,
                statusMessage: res.errMsg
            })
        }
    }
    wx.request(con)
}
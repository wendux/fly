/**
 * Created by rocky on 2019/1/9.
 * <author> wjl19890427@hotmail.com
 * https://github.com/rockywu
 * 支付宝小程序适配器
 */
module.exports = function(request, responseCallback) {
  let {url, headers, method, body, params, timeout, parseJson} = request;
  my.httpRequest({
    url,
    headers,
    method,
    data: body,
    timeout: timeout || 60 * 1000,
    dataType: parseJson ? 'json': "text",
    success: function(res) {
      console.log("my.httpRequest-success", res)
      responseCallback({
        responseText: res.data,
        statusCode: res.status,
        errMsg:"",
        headers: res.headers
      })
    },
    fail: function(err) {
      console.log("my.httpRequest-fail", err)
      responseCallback({
        responseText: err.data || "",
        statusCode: err.status || "",
        errMsg: err.error || "",
        headers: err.headers ||{}
      })
    }
  })
}
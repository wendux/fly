var rq=require("request")
var pkg = require('./../../package.json');

module.exports=function(request, responseCallBack) {
    var headers = request.headers;
    if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'fly/' + pkg.version;
    }
    request.body=request.data;
    if(request.hasOwnProperty("timeout")&&request.timeout<1){
       //use request lib default timeout
       delete request.timeout;
    }
    delete request.data;
    rq(request,function(error, response, body){
        var ret={
            statusCode:0
        }
        if(error){
           ret.errMsg=error.message
        }else{
            ret.statusCode=response.statusCode
            ret.responseText=body;
            ret.headers=response.headers;
            ret.statusMessage=response.statusMessage;
        }
        responseCallBack(ret)
    })

}




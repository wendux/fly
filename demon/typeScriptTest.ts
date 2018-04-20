import fly from "../index"
var log = console.log
fly.config.headers = {xx: 6}
fly.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = "XMLHttpRequest";
    config.headers['apiVersion'] = '1.0';
    log("request config", config)
    config["xx"] = 9; //custom option
})

fly.interceptors.response.use(
    function (response) {
        return response.data
     },
    function (err) {
        log(err);
    }
)


fly.get("").then(d => console.log("success", d))
import fly from "../index"
var log = console.log
fly.config.headers = {xx: 6}
fly.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = "XMLHttpRequest";
    config.headers['apiVersion'] = '1.0';
    log("request config", config)
    return config;
})


fly.interceptors.response.use(
    (response) => {
        log("response",response)
     },
    (err) => {
        log(err);
    }
)
fly.get("").then(e => console.log(e))
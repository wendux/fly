function expect(left, right) {
    if (left !== right) {
        console.log("Expect: " + left + " but: " + right);
        throw new Error();
    }
}

var csrfToken = "";
fly.config.headers = {"x-tag": "flyio"}
fly.config.baseURL = "http://www.dtworkroom.com/doris/1/2.0.0/"
var newFly = new Fly;
newFly.config = fly.config;
var log = console.log
fly.interceptors.request.use(function (request) {
    log("request：path:" + request.url + "，baseURL:" + request.baseURL)
    if (!csrfToken) {
        log("No token，request token firstly...");
        // locking the current instance, let the incomming request task enter a
        // queue before they enter the request interceptors.
        fly.lock();
        //Using  another fly instance to request csrfToken.
        //If use the same fly instance, there may lead a infinite loop:
        //(The request will go to the interceptor first, and then
        //enter the interceptor again when launching the new request
        //in the interceptor....)
        return newFly.get("/token").then(function (d) {
            request.headers["csrfToken"] = csrfToken = d.data.data.token;
            log("token请求成功，值为: " + d.data.data.token);
            log("发起请求：path:" + request.url + "，baseURL:" + request.baseURL)
            return request
        }).finally(function () {
            //fly.clear(); //clear the request queue
            // unlock the current instance, flush the request queue.
            fly.unlock();
        })
    } else {
        request.headers["csrfToken"] = csrfToken;
    }
})

describe("request", function () {
    it("request", function (done) {
        this.timeout(15000);
        var data = {
            "a": "你好",
            "b": [5, "6"],
            "c": {"d": 8, "e": {"a": 5, "b": [66, 8]}}
        };

        var promises = [
            fly.get("/test?tag=1")
                .then(function (d) {
                    log("success")
                }).catch(function (e) {
                log("fail")
            }),
            fly.get("/test?tag=2")
                .then(function (d) {
                    log("success")
                }).catch(function (e) {
                log("fail")
            }),
            fly.get("/test?tag=3")
                .then(function (d) {
                    log("success")
                }).catch(function (e) {
                log("fail")
            }),
            fly.get("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}}, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
                .then(function () {
                    log("success")
                }).catch(function () {
                log("fail")
            }),
            fly.post("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}}, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
                .then(function () {
                    log("success")
                }).catch(function () {
                log("fail")
            }),

            fly.post("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}})
                .then(function () {
                    log("success")
                }).catch(function () {
                log("fail")
            }),

            fly.get("http://xxx.bxxcom").catch(function (e) {
                log(e.message);
            })
        ];

        fly.all(promises).then(fly.spread(function () {
            done()
        }))
    })
});
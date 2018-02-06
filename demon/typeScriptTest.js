"use strict";
exports.__esModule = true;
//import fly from "../index"
var fly = require("../dist/npm/fly");
var log = console.log;
fly.config.headers = { xx: 6 };
fly.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = "XMLHttpRequest";
    config.headers['apiVersion'] = '1.0';
    log("request config", config);
    return config;
});
fly.interceptors.response.use(function (response, preHandler) {
    log("response", response);
}, function (err, preHandler) {
    log(err, err);
});
fly.get("").then(function (e) { return console.log(e); });

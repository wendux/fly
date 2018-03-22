"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var log = console.log;
index_1["default"].config.headers = { xx: 6 };
index_1["default"].interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = "XMLHttpRequest";
    config.headers['apiVersion'] = '1.0';
    log("request config", config);
    return config;
});
index_1["default"].interceptors.response.use(function (response) {
    log("response", response);
}, function (err) {
    log(err);
});
index_1["default"].get("").then(function (e) { return console.log(e); });

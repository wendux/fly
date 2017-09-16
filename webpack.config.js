/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
module.exports = {
    entry: {
        "wendu.ajaxhook": "./src/ajaxhook.js",
         "test": ["./demon/test.js"],
         "fly":"./src/fly.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].min.js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
    ]
}



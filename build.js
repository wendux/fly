/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var env=process.argv[2]
var output = {
    path: path.resolve("./dist"),
    filename: "[name].js",
    libraryTarget: "umd",
}
var plugins=[];
if (env === "build") {
    output.filename = "[name].min.js"
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    }))
}

var config= {
    entry: {
        "engine": "./src/engine.js",
        "fly": "./src/fly.js",
        "test": "./demon/test.js"
    },
    output: output,
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
    plugins: plugins
}
webpack(config,function (err,stats) {
    if(err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: true,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});



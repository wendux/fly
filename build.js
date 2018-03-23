/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var webpack = require('webpack');
var env=process.argv[2]||"dev"
require('shelljs/global')

//For cdn entry
var entry={
    "engine-wrapper": "./src/engine-wrapper.js",
    "fly": "./src/fly.js",
    "adapter/dsbridge":"./src/adapter/dsbridge.js",
    "adapter/webviewjsbridge":"./src/adapter/webviewjsbridge.js",
}

var output = {
    path: path.resolve("./dist"),
    filename: "[name].js"
}

var plugins=[];

var npmExtra = {
    "wx": "./src/wx.js",
    "weex": "./src/weex.js",
}

//for npm require
if(env==="npm"){
    Object.assign(entry, npmExtra)
    output.path=path.resolve("./dist/npm")
    output.libraryTarget = "umd"
} else if (env === "dev") {
    entry={
        "../demon/dist/test": "./demon/test.js",
        "../demon/dist/typeScriptTest": "./demon/typeScriptTest.js"
    }
}else{
    if(env==="cdn-min"||env==="umd"){
        output.filename = "[name].min.js"
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            // compress: {
            //     warnings: true
            // },
            sourceMap: true
        }))
    }
    if(env==="umd") {
        Object.assign(entry, npmExtra)
        output.libraryTarget = "umd"
        output.path=path.resolve("./dist/umd")
        output.filename = "[name].umd.min.js"
    }
}

var config= {
    entry: entry,
    output: output,
    //devtool: env !== "dev"? '#source-map': false,
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[
                    {
                        loader: 'keep-loader',
                        options:{
                            keep:env
                        }
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015']
                        }
                    },
                ]
            }
        ]
    },
    plugins: plugins
}
webpack(config,function (err,stats) {
    if(err) throw err;
    cp('-rf', 'src/hap.js', "dist/npm/hap.js")
    cp('-rf', 'src/adapter/hap.js', "dist/npm/adapter/hap.js")
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});



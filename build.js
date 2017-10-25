/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var webpack = require('webpack');
var env=process.argv[2]||"dev"

var entry={
    "engine-wrapper": "./src/engine-wrapper.js",
    "fly": "./src/fly.js",
    "wx":"./src/wx.js",
    "adapter/dsbridge":"./src/adapter/dsbridge.js",
    "adapter/webviewjsbridge":"./src/adapter/webviewjsbridge.js",
    "adapter/wx":"./src/adapter/wx.js",
}
var output = {
    path: path.resolve("./dist"),
    filename: "[name].js"
}

var plugins=[];
if (env !== "dev") {
    output.filename = "[name].min.js"
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        // compress: {
        //     warnings: true
        // },
        sourceMap: true
    }))
    if(env==="umd") {
        output.libraryTarget = "umd"
        output.filename = "[name].umd.min.js"
    }
}else{
    Object.assign(entry,{
        "../demon/dist/test": "./demon/test.js",
    })
    output.libraryTarget = "umd"

}

var config= {
    entry: entry,
    output: output,
    devtool: env !== "dev"? '#source-map': false,
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
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});



/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var webpack = require('webpack');
var env=process.argv[2]||"dev"
var output = {
    path: path.resolve("./dist"),
    filename: "[name].js"
}
var plugins=[];
if (env !== "dev") {
    output.filename = "[name].min.js"
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    }))
    if(env==="umd") {
        output.libraryTarget = "umd"
        output.filename = "[name].umd.min.js"
    }
}else{
    output.libraryTarget = "umd"
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



var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',// production
    context:__dirname+"/app", //源文件目录
    entry:{
        app:"./index.js" //在源文件目录下去找index.js 文件作为打包的入口文件
    },
    output:{
        path:__dirname+"/dist", //生成的文件存放目录
        filename:"[name].bundle.js" //生成的文件 name 表示entry下面的app
    },
    module:{
        rules:[
            {
                //test:/\.(js|jsx)$/,
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["react","es2015"] }
                }],
            },
            {   //对样式的支持
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.tpl.html',
            inject: 'body',
            filename: './index.html'
        })
    ]
}
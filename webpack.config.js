/**
 * Created by Galaxy065 on 2017/4/27.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 页面入口文件配置
    entry : {
        bundle: path.resolve(__dirname, './js/view/main/index.js'),
        vendor: ["react","react-dom","react-router-dom","antd"]
    },
    // 入口文件输出配置
    output : {
        path : __dirname + '/output',
        filename : '[name].bundle.js'
    },
    module: {
        // 加载器配置
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets: ['es2015','react','stage-0']
                }
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
            {   test: /\.css$/,
                loader:  ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    },
    // 其他解决方案配置
    resolve: {
        extensions: [' ', '.js', '.jsx', '.css', '.json'],
    },
    // 插件项
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        new ExtractTextPlugin("bundle.css")
    ]
}
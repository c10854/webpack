var webpack = require('webpack');
var path = require('path');
var ExtracTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

process.noDeprecation = true;

module.exports = function (env) {
    return {
        // 入口文件
        entry: {
            // 主要文件，经常改动的代码的打包
            main: './src/index.js',
            // 包文件，很少改动的代码包
            vendor: ['react', 'react-dom']
        },
        // 输出位置
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            // 设置什么目录会被搜索
            modules: [
                "node_modules"
            ],
            extensions: [".js"],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtracTextPlugin.extract({
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.js(x)?$/,
                    loader: "babel-loader",
                    query  :{
                        presets:['react','es2015']
                    }
                }
            ]
        },
        plugins: [
            // 独立打包
            new ExtracTextPlugin('styles.css'),
            // 设置常用固定文件打包位置
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vender', 'manifest']
            }),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            //线上环境设置
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    }
}
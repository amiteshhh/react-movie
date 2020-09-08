const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
    entry: './src/index.js',
    output: {
        filename: env.production ? 'bundle.[contenthash:8].js' : 'bundle.js',
        path: join(__dirname, 'build')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.production' : env.production
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            PUBLIC_URL:'public'
        })
    ],
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
        ]
    },
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: '/public',
        hot: !env.production
    }
});

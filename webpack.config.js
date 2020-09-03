const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: '/public'
    },
    plugins: [
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

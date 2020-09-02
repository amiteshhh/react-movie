const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: join(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Load a custom template (lodash by default)
            template: join(__dirname, 'public', '/index.html')
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
        contentBase: join(__dirname, 'public'),
        hot: !env.production
    }
});

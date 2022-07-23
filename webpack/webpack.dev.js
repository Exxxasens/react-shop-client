const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        open: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8080',
                logLevel: 'debug'
            }
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('React Shop Development')
        })
    ]
};

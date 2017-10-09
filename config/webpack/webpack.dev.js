const config = require('./webpack.base');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    ...config,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
};
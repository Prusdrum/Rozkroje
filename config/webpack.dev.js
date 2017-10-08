const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    entry: {
		division: './client/division/index.js'
	},
    output: {
        path: path.join(__dirname, "..",  "public", "javascripts"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        rules: [
            {
               test: /\.(js|jsx)$/, 
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ['es2015', 'react', 'env']
                   }
               }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: require.resolve('moment'),
                use: [{
                    loader: 'expose-loader',
                    options: 'moment'
                }]
            },
            {
                test: require.resolve('pikaday'),
                use: [{
                    loader: 'expose-loader',
                    options: 'pikaday'
                }]
            },
            {
                test: require.resolve('zeroclipboard'),
                use: [{
                    loader: 'expose-loader',
                    options: 'zeroclipboard'
                }]
            },
            {
                test: require.resolve('numbro'),
                use: [{
                    loader: 'expose-loader',
                    options: 'numbro'
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
};

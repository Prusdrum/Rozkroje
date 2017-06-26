var path = require('path');

module.exports = {
    entry: {
		division: './client/division/index.js'
	},
    output: {
        path: path.join(__dirname, "public", "javascripts"),
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
                       presets: ['env']
                   }
               }
            }
        ]
    }
};
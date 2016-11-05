const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	output: {
		// 		comments: false,
		// 	},
		// }),
	]
};

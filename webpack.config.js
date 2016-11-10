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
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
	]
};

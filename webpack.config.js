const path = require('path');

module.exports = {
	entry : './demo/main.js',
	module : {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist')
	},
	devtool: 'sourcemap'
};
const path = require('path');

module.exports = {
	entry : './demo/article.js',
	module : {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['env', 'stage-1']
			}
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist')
	},
	devtool: 'sourcemap'
};
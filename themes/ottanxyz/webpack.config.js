const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './assets/js/index.js',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
		],
	},
	output: {
		path: `${__dirname}/static/dist/js`,
		filename: 'app.js',
	},
	plugins: [new LodashModuleReplacementPlugin(), new Dotenv()],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
	},
	target: 'node',
}

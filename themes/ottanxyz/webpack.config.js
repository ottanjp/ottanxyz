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
			{
				test: /\.scss/, // 対象となるファイルの拡張子
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: false,
							importLoaders: 2,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
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

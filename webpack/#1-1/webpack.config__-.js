//	npx webpack --config webpack.config.js
// "start": "webpack-dev-server --mode development --open"

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true
			}
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}
module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index.js',
		analiytics: './analiytics.js'
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				}
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|ico|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				use: ['file-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			}
		]
	}
}
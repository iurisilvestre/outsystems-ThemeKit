const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/code-imports.js',
	output: {
		filename: 'main_th.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		port: 8080,
		static: path.resolve(__dirname, 'dist'),
		devMiddleware: {
			writeToDisk: true,
		},
		webSocketServer: false,
	},
	plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'), // Ensure Dart Sass is used
							sassOptions: {
								api: 'modern', // Use the modern API
							},
						},
					},
				],
			},
		],
	},
};

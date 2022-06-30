const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
  ],
};

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const appPath = path.join(__dirname, 'app');

process.env.BABEL_ENV = TARGET;

var common = {
  entry: appPath,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['','.js','.jsx','.wav']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: appPath
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: appPath
      },
      {
        test: /\.wav$/,
        loader: 'file',
        include: appPath
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Timer app'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

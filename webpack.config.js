var config = require('config');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const frontendSrcPath = path.join(__dirname, 'frontend/src');
const frontendBuildPath = path.join(__dirname, 'frontend/build');

process.env.BABEL_ENV = TARGET;

var webpackConfig = {
  entry: frontendSrcPath,
  output: {
    path: frontendBuildPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['','.js','.jsx','.wav']
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.jsx?$/, loader: 'babel', include: frontendSrcPath },
      { test: /\.wav$/, loader: 'file', include: frontendSrcPath },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Timer app'
    })
  ]
};

if(TARGET === 'dev' || !TARGET) {
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: config.website.port
  };
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;

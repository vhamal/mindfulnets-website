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
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.jsx?$/, loader: 'babel', include: appPath },
      { test: /\.wav$/, loader: 'file', include: appPath },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Timer app'
    }),
    // jQuery need to be loaded in this special way as some modules
    // e.g bootstrap expects it to be available through global window.jQuery
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};

if(TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 3002
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

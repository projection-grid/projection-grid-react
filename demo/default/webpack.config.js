/* eslint-disable */

var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  devServer: {
    contentBase: './',
    port: 9001,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'eslint-loader', exclude: [/node_modules/, /dist/] },
    ],
  },
  resolve: {
    alias: {
      ReactProjectionGrid: '../../dist/index',
    },
  },
};

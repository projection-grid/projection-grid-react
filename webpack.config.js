var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      './src/index.js',
    ],
    demo: [
      'react-hot-loader/patch',
      './demo/index.js',
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './',
    publicPath: '/dist/',
    port: 9999,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ],
  }
}

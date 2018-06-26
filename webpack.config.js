// webpack.config.js
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  const development = argv.mode === 'development';
  return {
    plugins: [
      // Note: the HtmlPlugin automatically adds the needed css and js
      // to the html file
      new HtmlPlugin({
        template: path.resolve(__dirname, './app/index.html'),
        filename: 'index.html'
      })
    ],
    devtool: development ? 'eval-source-map' : false,
    entry: {
      'bundle': [
        'babel-polyfill',
        path.resolve(__dirname, './app/index.jsx')
      ]
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: `[name]${production ? '.min' : ''}.js`
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        { test: /\.(css|scss)$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        { test: /\.(png|jpg)$/,
          loader: 'file-loader?name=img/[hash].[ext]'
        },
        // Bootstrap
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'},
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    }
  }
};

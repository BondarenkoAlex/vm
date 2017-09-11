'use strict';

var path               = require('path');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var autoprefixer       = require('autoprefixer');
var webpack            = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool      : 'inline-source-map',
  entry        : {
    'application': './src/index.js'
  },
  output       : {
    path      : path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename  : 'bundle.js'
  },
  devServer    : {
    contentBase: './dist',
    outputPath : path.resolve(__dirname, 'dist')
  },
  resolve      : {
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates   : ['*-loader', '*'],
    extensions        : ['', '.js']
  },
  postcss      : [autoprefixer({browsers: ['last 5 versions']})],
  module       : {
    loaders: [
      {
        test  : /\.(jade|pug)$/,
        loader: 'pug?includeInline=false'
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel',
        query  : {
          presets: ['es2015']
        }
      },
      {
        test  : /\.html$/,
        loader: 'raw'
      },
      {
        test  : /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!')
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!')
      },
      {
        test  : /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus!')
      },
      {
        test  : /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
        loader: 'file?name=[path][name].[ext]'
      }
    ]
  },
  sassLoader   : {
    precision: 8
  },
  plugins      : [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css?modules=true!postcss'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/account.pug',
      filename: 'account.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/account-index.pug',
      filename: 'account-index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/category.pug',
      filename: 'category.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/subcategory.pug',
      filename: 'subcategory.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/playlist.pug',
      filename: 'playlist.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/video-clip.pug',
      filename: 'video-clip.html'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname)
    })
  ]
};

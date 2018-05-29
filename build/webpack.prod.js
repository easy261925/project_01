const merge = require('webpack-merge')
const base = require('./webpack.base')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(base, {
  entry: {
   vendor: ['react','react-dom']
  },
  dependencies: ['./lib/vendor.js'],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
        exclude: /node_moudles/
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new CleanWebpackPlugin(['../dist']),
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.join(__dirname, '..'),
        verbose: true,
        dry: false 
      }
    ),
    new UglifyjsWebpackPlugin({sourceMap: false}),
    new webpack
      .optimize
      .CommonsChunkPlugin({name: 'common', filename: 'common.js'}),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../lib/manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
})

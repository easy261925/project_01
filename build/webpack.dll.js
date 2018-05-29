const webpack = require('webpack')
const path = require('path')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: [
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux'
  ],
  output: {
    path: path.resolve('lib'),
    filename: 'vendor.js',
    library: 'vendor_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve('lib/manifest.json')
    }),
    new UglifyjsWebpackPlugin()
  ]
}

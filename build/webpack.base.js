const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    bundle: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/, /build/, resolve('src/router/')
        ],
        loader: 'eslint-loader',
        enforce: 'pre', // 编译之前
        include: [
          resolve('src'), resolve('test')
        ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ],
            'plugins': [
              [
                'import', {
                  'libraryName': 'antd',
                  'libraryDirectory': 'es',
                  'style': 'true'
                }
              ],
              ['@babel/plugin-transform-runtime', {
                'helpers': false,
                'polyfill': false,
                'regenerator': true,
                'moduleName': '@babel/runtime'
              }],
              ['transform-react-remove-prop-types'], // 生产环境删除 prop-types
              ['@babel/plugin-proposal-object-rest-spread'] // 支持 {...}
            ]
          }
        },
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[hash:8].[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new HTMLWebpackPlugin({template: 'index.html', filename: 'index.html', inject: 'body'})],
  resolve: {
    alias: {
      Component: path.join(__dirname, '..', 'src/components/')
    }
  }
}

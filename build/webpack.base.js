const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const theme = require('../theme');

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
      },
      // Parse less files and modify variables
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          ({ resource }) => ({
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: /\.module\.less/.test(resource),
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          ({ resource }) => ({
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: /\.module\.css/.test(resource),
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ]
  },
  plugins: [new HTMLWebpackPlugin({ template: 'index.html', filename: 'index.html', inject: 'body' })],
  resolve: {
    alias: {
      Component: path.join(__dirname, '..', 'src/components/')
    }
  }
}

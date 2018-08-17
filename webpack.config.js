const { join, resolve } = require('path');
const { createReadStream } = require('fs');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
  context: __dirname,

  entry: {
    bundle: join(__dirname, 'src/index.jsx')
  },

  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    modules: [
      resolve('./src/'),
      resolve('./node_modules'),
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      filename: 'index.html',
      mobile: true,
      title: 'Test Task'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
      },
    }),
  ],

  devServer: {
    contentBase: resolve('public'),
    hot: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' }
      ]
    },
    before: function(app) {
      app.get('/api/tiles', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        createReadStream(join(process.cwd(), 'api/tiles.json'), { encoding: 'utf-8' })
          .pipe(res);
      });
    },
  },
};

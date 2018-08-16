const { join, resolve } = require('path');
const { createReadStream } = require('fs');

const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');

module.exports = {
  context: __dirname,
  entry: join(__dirname, 'src/index.jsx'),
  output: join(__dirname, 'public/bundle.js'),
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
    new HtmlPlugin({
      filename: 'index.html',
      template: HtmlTemplatePlugin,
      inject: false,
      mobile: true,
      appMountId: 'root'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
      },
    }),
  ],

  devServer: {
    contentBase: './public/',
    hot: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }
      ]
    },
    setup(app) {
      app.get('/api/tiles', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        createReadStream(join(process.cwd(), 'api/tiles.json'), { encoding: 'utf-8' })
          .pipe(res);
      });
    },
  },
};

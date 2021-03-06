// eslint-disable-next-line no-unused-vars
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  HtmlWebpackSkipAssetsPlugin,
} = require('html-webpack-skip-assets-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './assets/js/content.js',
    options: './assets/js/options.js',
    background: './assets/js/background.js',
  },
  output: {
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './html/popup.html',
      excludeAssets: [/options.js/, /background.js/],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: './html/options.html',
      excludeAssets: [/content.js/, /background.js/],
    }),
    new HtmlWebpackSkipAssetsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json' },
        { from: './assets/images', to: 'images' },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  mode: 'production',
};

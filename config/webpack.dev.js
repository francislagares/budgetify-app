const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: '#source-map',
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: 'dist',
    open: true, // Tells dev-server to open the browser after server had been started
    overlay: true, // Shows a full-screen overlay with errors or warnings
    hot: true, // update changes without full refresh in the browser
    inline: true,
    stats: {
      colors: true
    }
  },

  module: {
    rules: [
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash].css',
      chunkFilename: 'css/[id].css'
    })
  ]
});

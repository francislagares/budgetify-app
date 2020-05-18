const path = require('path');
const glob = require('glob');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production', // for tree shaking technique mode production must be on
  output: {
    filename: 'js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // To publish in Github Pages you will want to change it to repo folder name /budgetify-app/ in this case.
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({}), new TerserPlugin({})]
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
        ],
        sideEffects: true // Cue up for tree shake
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebPackPlugin({
      // Generate a file dist/index.html
      template: './src/index.html', // HTML source
      filename: './index.html', // Output html file into ./dist
      minify: {
        // Minimize HTML
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash].css'
    })
  ]
});

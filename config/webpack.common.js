const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = require('./paths')

module.exports = {
  entry: paths.entry,
  output: {
    filename: '[chunkhash].bundle.js',
    path: paths.output
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.template,
      hash: false
    }),
    new CopyWebpackPlugin([
      paths.public
    ])
  ]
}
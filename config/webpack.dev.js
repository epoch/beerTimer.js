const paths = require('./paths')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
    ],
  }, 
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.output,
    port: 8080,
    historyApiFallback: true,
    stats: 'errors-only'    
  }
}
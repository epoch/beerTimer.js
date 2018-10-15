const paths = require('./paths')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },      
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
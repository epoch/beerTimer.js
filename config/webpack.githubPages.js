const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let config = require('./webpack.prod')
const paths = require('./paths')

config.output = {
  path: paths.outputGithubPages
}

module.exports = config


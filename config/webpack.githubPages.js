const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const paths = require('./paths')
paths.output = paths.outputGithubPages

module.exports = require('./webpack.prod')


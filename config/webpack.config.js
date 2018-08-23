const common = require('./webpack.common')
const webpackMerge = require('webpack-merge')

const env = process.env.NODE_ENV || 'dev'
const envConfig = require(`./webpack.${env}.js`)

module.exports = webpackMerge(common, envConfig)
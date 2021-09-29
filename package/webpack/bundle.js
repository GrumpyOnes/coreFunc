const webpack = require('./lib/webpack.js')

const config = require('./webpack.config.js')

const wp = new webpack(config)
wp.run()
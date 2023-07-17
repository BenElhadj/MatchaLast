// const prodEnv = require('./prod.env')

// module.exports = {
//   ...prodEnv,
//   NODE_ENV: JSON.stringify('development')
// }
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

const DefinePlugin = require('webpack').DefinePlugin

class ConfigPlugin {
  apply(compiler) {
    new DefinePlugin({
      CONFIG: JSON.stringify(true)
    }).apply(compiler)
  }
}

module.exports = ConfigPlugin

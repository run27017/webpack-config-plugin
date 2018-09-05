const fs = require('fs')
const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin

class ConfigPlugin {
  constructor ({ dir, env }) {
    this.config = this.require(dir, 'config.js')
    this.configEnv = env ? this.require(dir, `config.${env}.js`) : {}
    this.configLocal = this.require(dir, 'config.local.js')
  }

  apply(compiler) {
    const finalConfig = Object.assign({}, this.config, this.configEnv, this.configLocal)
    new DefinePlugin({
      CONFIG: JSON.stringify(finalConfig)
    }).apply(compiler)
  }

  require (dirpath, filename) {
    const fullpath = path.resolve(dirpath, filename)
    if (fs.existsSync(fullpath)) {
      return require(fullpath)
    } else {
      return {}
    }
  }
}

module.exports = ConfigPlugin

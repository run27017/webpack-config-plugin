const fs = require('fs')
const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin
const merge = require('merge-deep')

class ConfigPlugin {
  constructor ({ dir, env, name }) {
    this.config = this.require(dir, 'config.js')
    this.configEnv = env ? this.require(dir, `config.${env}.js`) : {}
    this.configLocal = this.require(dir, 'config.local.js')
    this.configName = name || 'CONFIG'
  }

  apply(compiler) {
    const finalConfig = merge(this.config, this.configEnv, this.configLocal)
    new DefinePlugin({
      [this.configName]: JSON.stringify(finalConfig)
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

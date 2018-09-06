const path = require('path')
const ConfigPlugin = require('../../lib')

module.exports = function ({ configPluginOptions, targetFile }) {
  return {
    mode: 'development',
    context: __dirname,
    entry: './index.js',
    output: {
      library: 'CONFIG',
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist'),
      filename: targetFile
    },
    plugins: [
      new ConfigPlugin(configPluginOptions)
    ]
  }
}

const path = require('path')
const ConfigPlugin = require('../../lib')

module.exports = function ({ configPluginOptions, targetFile }) {
  return {
    mode: 'development',
    context: __dirname,
    entry: './index.2.js',
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist'),
      filename: targetFile
    },
    plugins: [
      new ConfigPlugin(configPluginOptions)
    ]
  }
}

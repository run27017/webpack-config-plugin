const path = require('path')
const ConfigPlugin = require('../lib')
const DefinePlugin = require('webpack').DefinePlugin

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    library: 'CONFIG',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: 'config.js'
  },
  plugins: [
    new ConfigPlugin()
  ]
}

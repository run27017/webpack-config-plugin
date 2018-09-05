const path = require('path')

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
}

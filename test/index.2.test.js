import test from 'ava'
import webpack from 'webpack'
import path from 'path'

// 0. Import the config that uses my plugin
import optionsBuilder2 from './fixtures/webpack.2.config';

test.cb('customize config variable name', t => {
  // 1. Run webpack
  const options = optionsBuilder2({
    configPluginOptions: {
      dir: path.resolve(__dirname, 'configs/config1'),
      name: 'CONFIG2'
    },
    targetFile: 'config1.2.js'
  })
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config1.2')
    t.deepEqual(CONFIG, {
      a: 11,
      b: 12
    })

    t.end()
  })
})

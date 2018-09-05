import test from 'ava'
import webpack from 'webpack'
import path from 'path'

// 0. Import the config that uses my plugin
import optionsBuilder from './fixtures/webpack.config';

test.cb('compile not specifying name', t => {
  // 1. Run webpack
  const configPath = path.resolve(__dirname, 'configs/config1')
  webpack(optionsBuilder({ dir: configPath }), function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config')
    t.deepEqual(CONFIG, {
      a: 1,
      b: 2
    })

    t.end()
  })
})

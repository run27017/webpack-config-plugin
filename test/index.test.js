import test from 'ava'
import webpack from 'webpack'
import path from 'path'

// 0. Import the config that uses my plugin
import optionsBuilder from './fixtures/webpack.config';

test.cb('compile not specifying env', t => {
  // 1. Run webpack
  const options = optionsBuilder({
    configPluginOptions: {
      dir: path.resolve(__dirname, 'configs/config1')
    },
    targetFile: 'config1.js'
  })
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config1')
    t.deepEqual(CONFIG, {
      a: 11,
      b: 12
    })

    t.end()
  })
})

test.cb('compile not specifying env and with local config file', t => {
  // 1. Run webpack
  const options = optionsBuilder({
    configPluginOptions: {
      dir: path.resolve(__dirname, 'configs/config2')
    },
    targetFile: 'config2.js'
  })
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config2')
    t.deepEqual(CONFIG, {
      a: 20,
      b: 22,
      c: 23
    })

    t.end()
  })
})

test.cb('compile specifying env', t => {
  // 1. Run webpack
  const options = optionsBuilder({
    configPluginOptions: {
      dir: path.resolve(__dirname, 'configs/config3'),
      env: 'dev'
    },
    targetFile: 'config3.js'
  })
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config3')
    t.deepEqual(CONFIG, {
      a: 30,
      b: 32,
      c: 33
    })

    t.end()
  })
})

test.cb('compile specifying env and with local config file', t => {
  // 1. Run webpack
  const options = optionsBuilder({
    configPluginOptions: {
      dir: path.resolve(__dirname, 'configs/config4'),
      env: 'dev'
    },
    targetFile: 'config4.js'
  })
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err)
    } else if (stats.hasErrors()) {
      return t.end(stats.toString())
    }

    // 3. Run assertions.
    const CONFIG = require('./fixtures/dist/config4')
    t.deepEqual(CONFIG, {
      a: 30,
      b: 32,
      c: 34
    })

    t.end()
  })
})

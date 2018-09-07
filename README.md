# config-plugin

> 管理配置文件的Webpack插件，支持环境名、local.

## 如何使用

首先，通过npm安装

```shell
$ npm i --save-dev config-plugin
```

然后，在webpack的配置文件内加上以下代码段

```js
const ConfigPlugin = require('config-plugin')

module.exports = {
  ...
  plugins: [
    new ConfigPlugin({
      dir: '/full/path/to/config/dir'
    })
  ]
}
```

这时，dir参数指定的目录下的`config.js`，`config.local.js`文件会被读取，并赋值为名为`CONFIG`的全局变量。其中优先级为`config.local.js > config.js`. 如：

```js
// config.js
module.exports = {
  a: 1,
  b: 2
}

// config.local.js
module.exports = {
  b: 3,
  d: 4
}

// index.js
console.log(CONFIG) // { a: 1, b: 3, d: 4 }
```

## 进阶用法

### 指定env参数

在构建ConfigPlugin的时候，如果传递了env参数，则会多读一个文件`config.[env].js`，如：

```js
new ConfigPlugin({
  dir: '/full/path/to/config/dir',
  env: 'dev'
})
```

则读取的文件依次为`config.js`，`config.dev.js`，`config.local.js`，后者的优先级大于前者。`env`参数不仅可以是`dev`、`prod`等，它可以是任意的字符串。

### 指定name参数

指定name参数可以定义Config对象的变量名，如

```js
new ConfigPlugin({
  dir: '/full/path/to/config/dir',
  env: 'dev',
  name: 'Settings'
})

// index.js
console.log(Settings) // { a: 1, b: 3, d: 4 }
```

## 推荐实践

### 通过环境变量管理dev参数

在`webpack.config.js`内，我们用环境变量管理dev参数，如：

```js
const env = process.env.ENV

module.exports = {
  ...
  plugins: [
    new ConfigPlugin({
      dir: path.resolve(__dirname, 'config'),
      env: env
    })
  ]
}
```

然后通过传递环境变量读取不同的配置文件列表，如：

    ENV=dev webpack webpack.config.js
    
会依次读取`config.js`、`config.dev.js`、`config.local.js`.

### 将config.local.js放在.gitignore内

我们将默认配置放在`config.js`内，与环境相关的变量放在`config.[env].js`内，`config.local.js`给了依次机会覆盖上面的两个配置文件。

`config.local.js`适合放一些敏感信息，如密钥等；或者在本地调试的时候覆盖之前的配置。这说明`config.local.js`应该被git ignore掉，不适合放在版本库内管理。

## License

MIT

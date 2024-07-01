# html-webpack-relative-assets-plugin
webpack html plugin 扩展插件,用于在多页面工程中页面index.html分文件夹存放时处理入口js文件路径

在webpack打包多页面应用时，如果我们想要把页面的index.html文件放在以页面名称命名的文件夹中，那么就需要在page配置中配置一个相对路径的publicPath，来修正index.html中引用的js文件的路径。
本插件在webpack打包多页面应用时，会使用相对路径来自动修正index.html中引用的js文件的路径。
不会在../pageA/index.html文件中出现 ../pageA/index.js 的引用路径.
../pageA/index.html 文件中的入口js文件路径会自动修正为 ./index.js

# install

```bash
  npm i --save-dev html-webpack-plugin html-webpack-relative-assets-plugin
```

```bash
  yarn add --dev html-webpack-plugin html-webpack-relative-assets-plugin
```

# usage
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackResolveAssetsPlugin = require("html-webpack-relative-assets-plugin");
const sourceDir = 'src/pages'
const chunks = []
module.exports = {
  pages: {
    pageA: {
      minify: false,
      template: `${sourceDir}/index.html`,
      entry: `${sourceDir}/pageA/main.js`,
      filename: `pageA/index.html`,
      // publicPath: '../',
      chunks: [...chunks, 'pageA']
    },
    pageB: {
      minify: false,
      template: `${sourceDir}/index.html`,
      entry: `${sourceDir}/pageB/main.js`,
      filename: `pageB/index.html`,
      // publicPath: '../',
      chunks: [...chunks, 'pageB']
    }
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name]/[name].[hash].js', // 使用了[name]/ 目录，如果不使用本插件，则需要配置publicPath来确保静态资源的正确引用
    chunkFilename: 'commonStatic/[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackResolveAssetsPlugin()
    ],
};

```
/*
 * Project: html-webpack-relative-assets-plugin
 * File: /index.js
 * Created Date: Monday, 2024-07-01 16:31:15
 * Author: Hu Fei
 * -----
 * Last Modified: Monday, 2024-07-01 16:31:16
 * Modified By: the developer formerly known as Hu Fei at <feige_hu@foxmail.com>
 * -----
 * Copyright (c) 2024 HF
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function processAssets(data, tags) {
  const htmlPath = path.join(data.publicPath, data.outputName);
  const htmlDir = path.dirname(path.resolve(htmlPath))
  tags.forEach(tag => {
    if (tag.attributes.src) {
      tag.attributes.src = path.relative(htmlDir, path.resolve(tag.attributes.src));
    }
    if (tag.attributes.href) {
      tag.attributes.href = path.relative(htmlDir, path.resolve(tag.attributes.href));
    }
  });
}
class HtmlWebpackRelativeAssetsPlugin {
  apply(compiler) {
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackRelativeAssetsPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackRelativeAssetsPlugin', (data, callback) => {
            const tags = [...data.bodyTags, ...data.headTags]
            processAssets(data, tags)

            callback(null, data)
          }
        )
      })
    } else {
      // HtmlWebpackPlugin version 3.2.0
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', (data) => {
          const tags = [...data.body, ...data.head]
          processAssets(data, tags)
        })
      })
    }
  }
}

module.exports = HtmlWebpackRelativeAssetsPlugin
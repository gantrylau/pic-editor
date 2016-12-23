const webpack    = require('webpack'),
      merge      = require('webpack-merge'),
      helper     = require('./helper'),
      baseConfig = require('./webpack.common.config');

const publicPath          = 'http://localhost:3000/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = merge(baseConfig, {
    entry : {
        vendor: ['vue', 'vue-resource'],
        app   : [helper.resolveFromSrc('main.js'), hotMiddlewareScript]
    },
    output: {
        publicPath: publicPath,
        path      : helper.resolveFromRoot('dev'),
        filename  : 'js/[name].js'//[hash]表示hash值,[name]文件名
    }
});
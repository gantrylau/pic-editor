var path       = require('path'),
    webpack    = require('webpack'),
    merge      = require('webpack-merge'),
    baseConfig = require('./webpack.common.config');

module.exports = merge(baseConfig, {
    entry : {
        vendor: ['vue', 'vue-router'],
        main  : [path.resolve(baseConfig.rootPath, 'src/index.js')]
    },
    output: {
        // publicPath: publicPath,
        path    : path.resolve(baseConfig.rootPath, 'dev'),
        filename: 'js/[name].js'//[hash]表示hash值,[name]文件名
    }
});
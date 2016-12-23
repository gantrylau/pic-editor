const path              = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      webpack           = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      merge             = require('webpack-merge'),
      helper            = require('./helper'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module : {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style!css!sass?sourceMap')},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.vue$/, loader: 'vue'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias     : {
            'vue'         : helper.resolveFromRoot('node_modules/vue/dist/vue.min.js'),
            'vue-resource': helper.resolveFromRoot('node_modules/vue-resource/dist/vue-resource.min.js'),
        }
    },
    vue    : {
        loaders: {
            sass: 'vue-style!css!sass?sourceMap'
        }
    },
    externals: {
        'createjs': 'window.createjs'
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: helper.resolveFromSrc('assets'), to: 'assets'}
        ]),
        // new webpack.DllPlugin({
        //     path   : path.resolve(rootPath, 'bin/manifest.json'),
        //     name   : '[name]',
        //     context: __dirname,
        // }),
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: helper.resolveFromSrc('index.html')
        })
    ]
};
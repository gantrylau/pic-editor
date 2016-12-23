"use strict";

let express         = require('express'),
    proxyMiddleware = require('http-proxy-middleware'),
    path            = require('path');

let app  = express();
let port = 3000;

app.locals.reload = true;

// static assets served by webpack-dev-middleware & webpack-hot-middleware for development
let webpack              = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig     = require('./webpack.dev.config.js');

let compiler = webpack(webpackDevConfig);

app.use(require('connect-history-api-fallback')());
// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo    : true,
    stats     : {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

// app.use(proxyMiddleware('/api', {target: 'http://localhost:8080'}));

// add "reload" to express, see: https://www.npmjs.com/package/reload
// let reload = require('reload');
// let http   = require('http');
// let server = http.createServer(app);
// reload(server, app);

app.listen(port, function () {
    console.log('App (dev) is now running on port 3000!');
});
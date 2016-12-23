const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

const rootPath = path.resolve(__dirname, '../');

module.exports = {
    resolveFromSrc : function (p) {
        return path.resolve(srcPath, p);
    },
    resolveFromRoot: function (p) {
        return path.resolve(rootPath, p);
    },
    rootPath       : rootPath,
    srcPath        : srcPath
};
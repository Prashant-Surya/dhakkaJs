var ProvidePlugin = require('webpack').ProvidePlugin;
var path = require('path');
const webpack = require('webpack');

var basePath = "../";
var buildPath = path.resolve(__dirname, '..', 'build');

module.exports = {

    target: 'web',
    entry: {
        dhakkaJsClient: './client.js'
    },

    output: {
        library: "dhakkaJsClient",
        path: buildPath,
        filename: "[name].js",
        libraryTarget: "umd"

    },

    module: {
        loaders: [{
            test: [/\.js$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },

    // resolve: {
    //    extensions: ['', '.js'],
    //    root: [
    //        path.resolve(__dirname, '..', 'node_modules'),
    //    ],
    //    modulesDirectories: ['node_modules'],
    // }
};

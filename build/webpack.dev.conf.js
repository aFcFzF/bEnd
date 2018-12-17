/**
 * @file webpack.dev.conf.js
 * @author bEnd
 */
'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const nib = require('nib');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

class SmartyMock {
    constructor(options) {
        this.$data = options || {};
    }
}

SmartyMock.prototype.apply = function (compiler) {
    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            htmlPluginData.html = htmlPluginData.html.replace(
                /{%json_encode\(\$((\w+)([.]\w+)*)\)%}/gi,
                ($0, $1) => {
                    const keys = $1.match(/\w+/g);
                    let data = this.$data;
                    for (const key of keys) {
                        if (data === undefined) {
                            return '';
                        }
                        else if (typeof data === 'number') {
                            return data;
                        }
                        else if (typeof data === 'string') {
                            return data;
                        }
                        data = data[key];
                    }
                    if (typeof data === 'string' || typeof data === 'number') {
                        return data;
                    }
                    return JSON.stringify(data);
                }
            );
            callback(null, htmlPluginData);
        });
    });

};

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    'use': [nib()],
                    'import': ['~nib/lib/nib/index.styl']
                }
            }
        }),

        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new SmartyMock(require(__dirname + '/../mock/home')),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/assets/img/favicon.ico',
            inject: true,
            hash: false,
            chunks: ['app']
        }),
        new FriendlyErrorsPlugin()
    ]
});


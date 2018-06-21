const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const _ = require('lodash');


const envConfig = _.get(require('../config'), 'prod', {}),
    getBaseWebpackConfig = require('./webpack.base');


const baseWebpackConfig = getBaseWebpackConfig(envConfig);
const entry = _.get(envConfig, 'entry', {});

const webpackConfig = merge(baseWebpackConfig, {
    entry: entry,
    devtool: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
    ]
});


module.exports = webpackConfig;


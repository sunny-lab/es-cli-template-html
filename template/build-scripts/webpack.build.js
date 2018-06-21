const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const _ = require('lodash');


const envConfig = _.get(require('../config'), 'build', {}),
    getBaseWebpackConfig = require('./webpack.base');


const baseWebpackConfig = getBaseWebpackConfig(envConfig);
const entry = _.get(envConfig, 'entry', {});

const webpackConfig = merge(baseWebpackConfig, {
    entry: entry,
    devtool: false,
});


module.exports = webpackConfig;



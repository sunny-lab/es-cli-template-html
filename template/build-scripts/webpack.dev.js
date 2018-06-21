const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const _ = require('lodash');


const envConfig = _.get(require('../config'), 'dev', {}),
    getBaseWebpackConfig = require('./webpack.base');


const baseWebpackConfig = getBaseWebpackConfig(envConfig);
const entry = _.get(envConfig, 'entry', {});
Object.keys(entry).forEach(function (name) {
    entry[name] = ['webpack-dev-server/client/index.js?http://localhost:' + _.get(envConfig, 'port', 8081) + '/'].concat(entry[name])
});

const webpackConfig = merge(baseWebpackConfig, {
    entry: entry,
    devtool: '#eval-source-map',
});


module.exports = webpackConfig;



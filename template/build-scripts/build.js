const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const ora = require('ora');
const del = require('del');
const Promise = require('bluebird');

const envConfig = _.get(require('../config'), 'build', {});

const webpackConfig = require('./webpack.build'),
    logger = require('./logger'),
    packageJson = require('../package.json');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(_.get(envConfig, 'env.NODE_ENV'));
}

const spinner = ora('building for build...');
spinner.start();

del(envConfig.assetsRoot)
    .then(function () {
        return new Promise(function (resolve, reject) {
            webpack(webpackConfig, function (err, stats) {
                spinner.stop();
                if (err) {
                    return reject(err);
                }
                console.log(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }));
                resolve(stats);
            });
        });
    })
    .catch(function (err) {
        logger.error(err);
    });

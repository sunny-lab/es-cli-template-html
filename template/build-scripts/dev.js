const path = require('path');
const shelljs = require('shelljs');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const _ = require('lodash');

const envConfig = _.get(require('../config'), 'dev', {});

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(_.get(envConfig, 'env.NODE_ENV'));
}

const webpackConfig = require('./webpack.dev'),
    logger = require('./logger'),
    packageJson = require('../package.json');

const compiler = webpack(webpackConfig),
    server = new WebpackDevServer(compiler, {
        contentBase: path.join(_.get(envConfig, 'assetsRoot', '.'), _.get(envConfig, 'assetsSubDirectory', '.')),
        port: _.get(envConfig, 'port', 8081),
        clientLogLevel: "warning",
        stats: {colors: true},
        publicPath: _.get(webpackConfig, 'output.publicPath', '/'),
        headers: {"Access-Control-Allow-Origin": "*"}
    });
compiler.plugin('done', function () {
    logger.info('compile done');
});
server.listen(_.get(envConfig, 'port', 8081), 'localhost', function () {
    logger.info("Starting static server on http://localhost:" + _.get(envConfig, 'port', 8081));
});





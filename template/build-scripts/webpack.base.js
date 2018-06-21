const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const util = require('./util'),
    path = require('path');

/**
 * get webpackConfig with env config
 * @param envConfig location: projectRoot/config/index.js
 * @returns {{output: {path}, module: {rules: *[]}, plugins: *[]}}
 */
module.exports = function (envConfig) {
    const baseConfig = {
        output: {
            filename: util.assetsPath('js/[name].[chunkhash].js'),
            chunkFilename: util.assetsPath('js/[id].[chunkhash].js'),
            path: _.get(envConfig, 'assetsRoot', ''),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules(\/|\\)(attr-accept|disposables|normalizr|react-echarts|util-toolkit|yr-gmenu))/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: util.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(less|css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'postcss-loader',
                            'less-loader'
                        ]
                    }),
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': _.get(envConfig, 'env', 'development')
            }),

            // extract css into its own file
            new ExtractTextPlugin({
                filename: util.assetsPath('css/[name].[contenthash].css')
            }),

            // copy custom static assets
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, '../assets'),
                    to: _.get(envConfig, 'assetsSubDirectory', ''),
                    ignore: ['.*']
                }
            ]),
        ]
    };
    // handle backend html
    const pageMap = _.get(envConfig, 'pageMap', []);
    if (!_.isEmpty(pageMap)) {
        pageMap.forEach(function (page) {
            baseConfig.plugins.push(new HtmlWebpackPlugin(page));
        });
    }
    // handle copy assets
    const copyAssets = _.get(envConfig, 'copyAssets', []);
    if (!_.isEmpty(copyAssets)) {
        baseConfig.plugins.push(new CopyWebpackPlugin(copyAssets));
    }

    // handle analyze
    if (_.get(envConfig, 'stats')) {
        baseConfig.plugins.push(
            new StatsPlugin('stats.json', {
                chunkOrigins: false,
                modules: false,
                hash: true,
                errors: true,
                errorDetails: false,
                source: false,
                reasons: false,
                warnings: true,
                chunks: false
            })
        )
    }
    return baseConfig;
}

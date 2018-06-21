var path = require('path');

const pageMap = [
    {
        chunks: ['app'],
        inject: 'body',
        template: './src/index.html',
        filename: './index.html'
    }
];

const entry = {
    app: ['./src/app.js']
};

module.exports = {
    dev: {
        entry: entry,
        env: {
            NODE_ENV: '"development"'
        },
        port: 8081,
        assetsRoot: path.resolve(__dirname, '../build'),
        pageMap: pageMap,
        assetsSubDirectory: 'assets',
        assetsPublicPath: 'http://localhost:8081/',
    },
    build: {
        entry: entry,
        env: {
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../build'),
        assetsSubDirectory: 'assets',
        // TODO: add oss domain name
        assetsPublicPath: '/',
        pageMap: pageMap,
        analyze: true
    },
    prod: {
        entry: entry,
        env: {
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../build'),
        assetsSubDirectory: 'assets',
        // TODO: add oss domain name
        assetsPublicPath: '/',
        pageMap: pageMap,
        analyze: true
    },
};

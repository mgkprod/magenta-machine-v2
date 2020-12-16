const webpack = require('webpack');
const path = require('path');
const fs = require('fs')
const package = fs.readFileSync('./package.json')
const version = JSON.parse(package).version || '0.1.0'

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                PACKAGE_VERSION: '"' + version + '"'
            }
        })
    ],
};

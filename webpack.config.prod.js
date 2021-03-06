/* eslint strict:0 */
'use strict';

var path = require('path');

const webpack = require('webpack');
const baseConfig = require('./webpack.config');

const config = Object.create(baseConfig);

Object.assign(config, {
  entry: path.join(__dirname, 'src/index.js'),
  externals: {
    'rxjs': {
      root: 'Rx',
      commonjs2: 'Rx',
      commonjs: 'Rx',
      amd: 'Rx',
    },
  },
});

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }),
]);

module.exports = config;

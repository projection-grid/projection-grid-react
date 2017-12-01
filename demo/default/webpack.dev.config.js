var config = require('./webpack.config.js');

config.resolve.alias['react-projection-grid'] = '../../src/index';

module.exports = config;

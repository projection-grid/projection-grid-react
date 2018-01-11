var config = require('./webpack.config.js');

config.resolve.alias['projection-grid-react'] = '../../../src/index';

module.exports = config;

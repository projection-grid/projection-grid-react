var config = require('./webpack.config.js');

config.resolve.alias.ReactProjectionGrid = '../../src/index';

console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
console.log(config);

module.exports = config;

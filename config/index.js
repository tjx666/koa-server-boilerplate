const getEnv = require('../app/extend/env');

const configuration = getEnv() !== 'production'
    ? require('./config.dev')
    : require('./config.prod');

module.exports = configuration;
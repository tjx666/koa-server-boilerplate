const configuration = require('../../config');

module.exports = (server, options) => {
    server.configuration = server.context.configuration = configuration;
};
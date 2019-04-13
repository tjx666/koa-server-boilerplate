const Joi = require('joi');

module.exports = (server, options) => {
    server.context.validator = Joi;
};
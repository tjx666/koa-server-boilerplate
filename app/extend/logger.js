const { appLogger, ctxLogger }  = require('../../config').logger; 

module.exports = (server, options) => {
    server.logger = appLogger;
    server.context.logger = ctxLogger;
};
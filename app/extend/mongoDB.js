const mongoose = require('mongoose');
const mongoDBConfiguration = require('../../config').mongoDB;
const models = require('../model');


module.exports = (server, options) => {
    const { logger } = server;
    const URL = mongoDBConfiguration.URL;
    mongoose.connect(URL, options);

    const db = mongoose.connection;
    db.on('error', () => {
        logger.error('Connect to mongodb error!');
    });
    db.once('open', __ => {
        logger.info('Connection to mongodb open!');
    });

    server.context.models = models;
};

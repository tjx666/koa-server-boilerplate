const mongoose = require('mongoose');
const { mongoose: { options }} = require('../../config');
const models = require('../model');


module.exports = __ => {
    const URL = 'mongodb://localhost:27017';

    mongoose.connect(URL, options);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connect to mongodb error!'));
    db.once('open', __ => {
        console.log('Connection to mongodb open!');
    });

    return models;
};

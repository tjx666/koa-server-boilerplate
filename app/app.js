'use strict';

const path = require('path');
const chalk = require('chalk');
const { server: serverConfiguration } = require('../config');
const Koa = require('koa');
const logger = require('koa-logger');
const staticServer = require('koa-static');
const bodyParser = require('koa-bodyparser');
const mongoDB = require('./middleware/mongoDB');
const redis = require('./middleware/redis');
const validator = require('./middleware/validator');
const restify = require('./middleware/restify');


const server = new Koa();


// init middleware
const init = __ => {
    // print access info
    server.use(logger());

    // static resource
    server.use(staticServer(path.resolve(__dirname, './public')));

    // parse json body
    server.use(bodyParser());

    // add models to ctx
    server.use(mongoDB());

    // add redis to ctx
    server.use(redis());

    // add Joi to ctx
    server.use(validator());

    // restful and deal error
    server.use(restify());
};

process.on('unhandledRejection', (err) => {
    console.error(chalk.red(err));
    process.exit(1);
});

init();


// start server
const start = __ => {
    server.listen(serverConfiguration.port, serverConfiguration.host);
    console.log( chalk.green(`Server running at: http://${ serverConfiguration.host }:${ serverConfiguration.port }`));
};

start();

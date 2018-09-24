//  .__                               .__    ________ ________ ________
//  |  | ___.__._______   ____ _____  |  |  /  _____//  _____//  _____/
//  |  |<   |  |\_  __ \_/ __ \__  \ |  | /   __  \/   __  \/   __  \ 
//  |  |_\___  | |  | \/\  ___/ / __ \|  |_\  |__\  \  |__\  \  |__\  \
//  |____/ ____| |__|    \___  >____  /____/\_____  /\_____  /\_____  /
//       \/                  \/     \/            \/       \/       \/ 

'use strict';

const path = require('path');
const chalk = require('chalk');
const { server: serverConfiguration } = require('../config');
const log4js = require('./extend/log4js');
const Koa = require('koa');
const logger = require('koa-logger');
const staticServer = require('koa-static');
const bodyParser = require('koa-bodyparser');
const restify = require('./middleware/restify');
const router = require('./middleware/controller');
const mongoDB = require('./extend/mongoDB');
const redis = require('./extend/redis');
const validator = require('./extend/validator');



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
    server.models = mongoDB();

    // add redis to ctx
    server.context.redis = redis();

    // add Joi to ctx
    server.context.Joi = validator();

    // add loggers
    server.logger = log4js.getLogger('application');
    server.context.logger = log4js.getLogger('context');

    // restful and deal error
    server.use(restify([
        '/api/',
        '/user/login',
    ]));

    // add routes to server
    server.use(router());
};

const errorLogger = log4js.getLogger('appError');
server.on('error', err => {
    errorLogger.error(err);
});

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

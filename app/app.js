//  .__                               .__    ________ ________ ________
//  |  | ___.__._______   ____ _____  |  |  /  _____//  _____//  _____/
//  |  |<   |  |\_  __ \_/ __ \__  \ |  | /   __  \/   __  \/   __  \ 
//  |  |_\___  | |  | \/\  ___/ / __ \|  |_\  |__\  \  |__\  \  |__\  \
//  |____/ ____| |__|    \___  >____  /____/\_____  /\_____  /\_____  /
//       \/                  \/     \/            \/       \/       \/ 

const path = require('path');
const chalk = require('chalk');
const serverConfiguration = require('../config').server;
const Koa = require('koa');

// middlewares
const loggerMiddleware = require('koa-logger');
const staticServer = require('koa-static');
const bodyParser = require('koa-bodyparser');
const historyApiFallback = require('./middleware/historyApiFallback');
const restify = require('./middleware/restify');
const router = require('./middleware/controller');

// extends
const extendMongodb = require('./extend/Mongodb');
const extendLogger = require('./extend/logger');
// const extendsRedis = require('./extend/redis');
const extendValidator = require('./extend/validator');



const server = new Koa();

// init middleware
const init = () => {
    // !: 日志扩展放最前面方便后面的扩展和中间件使用 logger
    extendLogger(server, {});

    // 输出访问情况
    server.use(loggerMiddleware());

    // spa 单页面使用这个中间件将所有页面请求定向到首页
    server.use(historyApiFallback({enable: true}));
    
    // static resource
    server.use(staticServer(path.resolve(__dirname, './public')));

    // 解析 request.body 和自动序列化 response.body
    server.use(bodyParser());

    // add models to ctx
    extendMongodb(server, {});

    // add redis to ctx
    // extendsRedis(server, {});

    // add Joi to ctx
    extendValidator(server, ctx);

    // restful and deal error
    server.use(restify([
        '/api/',
        '/user/login',
    ]));

    // 一切准备就绪在使用 router 中间件
    server.use(router());
};

const { logger } = server;
server.on('error', err => {
    logger.error(err);
});

process.on('unhandledRejection', (err) => {
    logger.error(chalk.red(err));
    process.exit(1);
});

init();

// start server
const start = () => {
    server.listen(serverConfiguration.port, serverConfiguration.host);
    logger.info( chalk.green(`Server running at: http://${ serverConfiguration.host }:${ serverConfiguration.port }`));
};

start();

'use strict';

const Router = require('koa-router');
const chalk = require('chalk');

const router = new Router();
const setRouter = ({
    method = 'GET',
    path,
    handler
} = {}) => {
    if (!Array.isArray(method)) {
        console.info(chalk.yellow(`Register the route: [ ${ method } ] ${ path }`));
        router[method.toLowerCase()](path, handler);
    } else {
        console.info(chalk.yellow(`Register the route: [ ${ method.join(',') } ] ${ path }`));
        for (const oneMethod of method) {
            router[oneMethod.toLowerCase()](path, handler);
        }
    }
};


module.exports = __ => {
    return router.routes();
};
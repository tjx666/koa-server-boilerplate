'use strict';

const Joi = require('joi');

module.exports = __ => {
    return async (ctx, next) => {
        ctx.Joi = Joi;
        await next();
    };
};
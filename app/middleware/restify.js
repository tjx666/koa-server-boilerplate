'use strict';

const Boom = require('boom');


module.exports = (pathPrefix='/api/') => {
    return async (ctx, next) => {
        if (ctx.request.path.startsWith(pathPrefix)) {
            console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
            ctx.rest = (data, status) => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
                ctx.response.status = status;
            };
            try {
                await next();
            } catch (err) {
                console.log('Process API error...');
                if (Boom.isBoom(err)) {
                    for (const header of Object.entries(err.headers)) {
                        ctx.response.append(...header);
                    }
                    ctx.rest(err.payload, 400);
                } else {
                    ctx.response.body = {
                        error: err.errorType|| 'internal:unknown_error',
                        message: err.message || ''
                    };
                }
            }
        } else {
            await next();
        }
    };
};
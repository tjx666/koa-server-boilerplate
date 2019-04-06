'use strict';

module.exports = (pathPrefixes = ['/api/']) => {
    return async (ctx, next) => {
        const path = ctx.request.path;
        const shouldRestify = pathPrefixes.some(pathPrefix => path.startsWith(pathPrefix));
        if (shouldRestify) {
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
                const errData = {
                    error: err.name || 'internal:unknown_error',
                    message: err.message || ''
                };
                const status = err.status || 400;
                ctx.rest(errData, status);
            }
        } else {
            await next();
        }
    };
};
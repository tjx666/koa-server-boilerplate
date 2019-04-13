module.exports = (options) => {
    return async (ctx, next) => {
        const { logger, request: { path } } = ctx;
        const { restifyPrefix } = options;
        const shouldRestify = restifyPrefix.some(prefix => path.startsWith(prefix));

        if (shouldRestify) {
            ctx.response.type = 'application/json';
            ctx.rest = (data, status) => {
                ctx.response.body = data;
                ctx.response.status = status;
            };

            try {
                await next();
            } catch (err) {
                const errData = {
                    error: err.name || 'internal: unknown_error',
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
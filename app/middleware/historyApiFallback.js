exports = module.exports = function historyApiFallback(options) {
    options = options || {};

    return async function (ctx, next) {
        if (!options.enable) {
            return await next();
        }

        const { request: req, response: res, logger } = ctx;
        const headers = req.headers;
        const isRewrite = req.method === 'GET' 
            && headers && typeof headers.accept === 'string'
            && headers.accept.indexOf('application/json') === 0
            && acceptsHtml(headers.accept, options);

        if (isRewrite) {
            const rewriteTarget = options.index || '/index.html';
            logger.info('Rewriting', req.method, req.url, 'to', rewriteTarget);
            req.url = rewriteTarget;
            await next();
        }
        
        await next();
    };
};

const acceptsHtml = (header, options) => {
    options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
    for (let i = 0; i < options.htmlAcceptHeaders.length; i++) {
        if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
            return true;
        }
    }
    return false;
};
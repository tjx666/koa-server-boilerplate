'use strict';

exports = module.exports = function historyApiFallback(options) {
    options = options || {};

    return async function ({ request: req, response: res }, next) {
        if (!options.enable) {
            return await next();
        }

        const headers = req.headers;
        if (req.method !== 'GET') {
            console.log(
                'Not rewriting',
                req.method,
                req.url,
                'because the method is not GET.'
            );
            await next();
        } else if (!headers || typeof headers.accept !== 'string') {
            console.log(
                'Not rewriting',
                req.method,
                req.url,
                'because the client did not send an HTTP accept header.'
            );
            await next();
        } else if (headers.accept.indexOf('application/json') === 0) {
            console.log(
                'Not rewriting',
                req.method,
                req.url,
                'because the client prefers JSON.'
            );
            await next();
        } else if (!acceptsHtml(headers.accept, options)) {
            console.log(
                'Not rewriting',
                req.method,
                req.url,
                'because the client does not accept HTML.'
            );
            await next();
        } else {
            const rewriteTarget = options.index || '/index.html';
            console.log('Rewriting', req.method, req.url, 'to', rewriteTarget);
            req.url = rewriteTarget;
            await next();
        }
    };
};

function acceptsHtml(header, options) {
    options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
    for (let i = 0; i < options.htmlAcceptHeaders.length; i++) {
        if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
            return true;
        }
    }
    return false;
}

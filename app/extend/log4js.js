const log4js = require('log4js');
const path = require('path');
// log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
    appenders: {
        app2File: {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/app.log')
        },
        context2File: {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/context.log')
        },
        appError2File: {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/error.log')
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        application: {
            appenders: ['console', 'app2File'],
            level: 'trace'
        },
        context: {
            appenders: ['console', 'context2File'],
            level: 'trace'
        },
        appError: {
            appenders: ['appError2File'],
            level: 'warn'
        },
        default: {
            appenders: ['console'],
            level: 'trace'
        }
    }
});

module.exports = log4js;
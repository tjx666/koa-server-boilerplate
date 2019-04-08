const log4js = require('log4js');
const path = require('path');
const fs = require('fs-extra');

const appLogPath = path.resolve(__dirname, '../logs/application.log');
const ctxLogPath = path.resolve(__dirname, '../logs/context.log');
const appErrorFilePath = path.resolve(__dirname, '../logs/appError.log');
const ctxErrorFilePath = path.resolve(__dirname, '../logs/ctxError.log');

log4js.configure({
    appenders: {
        appDateFile: {
            type: 'dateFile',
            filename: appLogPath,
            pattern: 'yyyy-MM-dd',
            compress: false
        },
        ctxDateFile: {
            type: 'dateFile',
            filename: ctxLogPath,
            pattern: 'yyyy-MM-dd',
            compress: false
        },
        appErrorDateFile: {
            type: 'dateFile',
            filename: appErrorFilePath,
            pattern: 'yyyy-MM-dd',
            compress: false,
        },
        ctxErrorDateFile: {
            type: 'dateFile',
            filename: ctxErrorFilePath,
            pattern: 'yyyy-MM-dd',
            compress: false,
        },
        justAppErrorsToFile: {
            type: 'logLevelFilter',
            appender: 'appErrorDateFile',
            level: 'error'
        },
        justCtxErrorsToFile: {
            type: 'logLevelFilter',
            appender: 'ctxErrorDateFile',
            level: 'error'
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'trace'
        },
        application: {
            appenders: ['out', 'appDateFile', 'justAppErrorsToFile'],
            level: 'trace'
        },
        context: {
            appenders: ['out', 'ctxDateFile', 'justCtxErrorsToFile'],
            level: 'trace'
        }
    }
});


const clear = async () => {
    const files = await fs.readdir(path.resolve(__dirname, '../out/log'));
    for (const fileName of files) {
        fs.remove(path.resolve(__dirname, `../out/log/${fileName}`));
    }
};


exports.default = {
    appLogger: log4js.getLogger('application'),
    ctxLogger: log4js.getLogger('context'),
    clear
};
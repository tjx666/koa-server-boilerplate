'use strict';

const createError = require('http-errors');

const error = createError(401, 'permisssion deny!');

console.log({
    name: error.name,
    msg: error.message,
    code: error.status
});
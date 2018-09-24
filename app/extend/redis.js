'use strict';

const { redis: redisOptions } = require('../../config');
const chalk = require('chalk');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


module.exports = __ => {
    const client = redis.createClient(redisOptions);
    client.on('connect', __ => console.log(chalk.yellow('Connect to redis success!')));
    client.on('error', err => {
        console.log('RedisError:', err);
    });

    return client;
};
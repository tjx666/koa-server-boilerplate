const redisConfiguration = require('../../config'.redis);
const chalk = require('chalk');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


module.exports = (server, options) => {
    const { logger } = server;
    const client = redis.createClient(redisConfiguration.options);
    client.on('connect', __ => logger.info(chalk.yellow('Connect to redis success!')));
    client.on('error', err => {
        logger.err('Redis happen an error!\n', JSON.stringify(err, null, 2));
    });

    server.context.redis = client;
};
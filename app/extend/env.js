'use strict';

const argv = require('yargs').argv;
const chalk = require('chalk');

const dealEnv = clientEnv => {
    const envMap = new Map([
        [
            'development',
            [
                'dev',
                'DEV',
                'develop',
                'DEVELOP',
                'development',
                'DEVELOPMENT'
            ],
        ],
        [
            'test',
            [
                'test',
                'TEST',
            ],
        ],
        [
            'production',
            [
                'prod',
                'PROD',
                'product',
                'PRODUCT',
                'production',
                'PRODUCTION'
            ]
        ]
    ]);

    for (const [standardEnv, mapEnvList] of envMap.entries()) {
        const findRes = mapEnvList.find(env => env === clientEnv);
        if (findRes) {
            if (findRes !== standardEnv) {
                console.warn(`${ chalk.yellow('You should use the standard writing ') }${ chalk.green.bold(standardEnv) } insteadOf ${ chalk.blue.bold(findRes) }`);
            }

            return standardEnv;
        }
    }
};

const getEnv = __ => {
    // cmd args first
    const argEnv = argv.env || argv.ENV;
    if (argEnv !== undefined) return dealEnv(argEnv);

    // process.env
    const processEnv = process.env.NODE_ENV;
    if (processEnv) return dealEnv(processEnv);

};

module.exports = getEnv;
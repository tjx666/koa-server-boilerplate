const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const configuration = {};
const overrideConfiguration = require('./override');
fs.readFileSync(__dirname)
    .filter(fileName => !(fileName in ['index.js', 'override.js']))
    .forEach(fileName => {
        const configuration = require(path.resolve(__dirname, fileName));
        const configurationName = configuration.name || fileName.slice(0, -3);
        // TODO: 根据不同的环境导出不同的配置
        configuration[configurationName] = _.merge(configuration, overrideConfiguration[configurationName]);
    });

const fs = require('fs-extra');
const path = require('path');

module.exports = exports = configuration = {};

fs.readFileSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .forEach(fileName => {
        const configuration = require(path.resolve(__dirname, fileName));
        const configurationName = configuration.name || fileName.slice(0, -3);
        // TODO: 根据不同的环境导出不同的配置
        configuration[configurationName] = configuration.default;
    });
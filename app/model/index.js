const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configuration = require('../../config');
const defaultSchemaOptions = configuration.mongoDB.defaultSchemaOptions;


const getModels = __ => {
    console.info(chalk.yellow('Start define the models!'));
    console.info(chalk.magentaBright(`DefaultSchemaOptions:\n${JSON.stringify(defaultSchemaOptions, null, '     ')}`));
    const models = {};

    fs.readdirSync(__dirname)
        .filter(fileName => fileName !== 'index.js')
        .forEach(fileName => {
            const modelName = fileName.slice(0, -3);
            const model = require(path.resolve(__dirname, moduleName));
            console.info(`${chalk.yellow('Define the model') } ${ chalk.yellow.underline.bold(modelName) }${ chalk.yellow(', structure:\n') }${ chalk.green(JSON.stringify(module, null, '   ')) }`);
            const modelSchema = new Schema(model, defaultSchemaOptions);
            models[modelName] = mongoose.model(modelName, modelSchema);
        });

    return models;
};

module.exports = getModels();
'use strict';

const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const pluralize = require('pluralize');
const configuration = require('../../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const defaultSchemaOptions = configuration.mongoose.defaultSchemaOptions;


const getModels =  __ => {
    console.info(chalk.yellow('Start define the models!'));
    console.info(chalk.magentaBright(`DefaultSchemaOptions:\n${JSON.stringify(defaultSchemaOptions, null, '     ')}`));
    const moduleNames = fse
        .readdirSync(__dirname)
        .filter(moduleName => moduleName !== 'index.js')
        .map(moduleName => moduleName.slice(0, -3));

    const models = {};
    for (const moduleName of moduleNames) {
        const module = require(path.resolve(__dirname, moduleName));
        const modelName = `${moduleName[0].toUpperCase() }${ moduleName }`;
        console.info(`${chalk.yellow('Define the model') } ${ chalk.yellow.underline.bold(modelName) }${ chalk.yellow(', structure:\n') }${ chalk.green(JSON.stringify(module, null, '   ')) }`);
        const modelSchema = new Schema(module, defaultSchemaOptions);
        models[modelName] = mongoose.model(moduleName, modelSchema, pluralize(moduleName));
    }

    return models;
};

module.exports = getModels();


/* eslint-disable import/no-dynamic-require */

/**
 * 除了app.config的调用方式,如果要直接引用配置,请引用这个文件
 */

'use strict';

const extend = require('extend2');
const defaultEggConfig = require('./config.default');

const env = process.env.EGG_SERVER_ENV || 'prod';

const envEggConfig = require(`${__dirname}/config.${env}`);

module.exports = extend(true, {}, defaultEggConfig, envEggConfig);

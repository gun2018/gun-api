'use strict';
const pluginConfig = {
  // mysql: {
  //   client: {
  //     host: '119.29.26.21',
  //     port: '3306',
  //     user: 'gun',
  //     password: 'gun2018',
  //     database: 'gun',
  //   },
  //   app: true,
  //   agent: false,
  // },
  knex: {
    gun: {
      client: 'mysql',
      debug: true,
      connection: {
        host: '119.29.26.21',
        port: '3306',
        user: 'gun',
        password: 'gun2018',
        database: 'gun',
        charset: 'utf8mb4',
      },
    },
  },
};

const securityConfig = {};

const middleware = {};

module.exports = () => {
  return Object.assign(
    { keys: 'gun2017' },
    pluginConfig,
    middleware,
    securityConfig
  );
};

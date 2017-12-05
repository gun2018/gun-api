'use strict';
const pluginConfig = {
  mysql: {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'local_gun',
      password: 'gun2017',
      database: 'gun',
    },
    app: true,
    agent: false,
  }
};

const securityConfig = {};

const middleware = {};


module.exports = () => {
  return Object.assign({ keys: 'gun2017' }, pluginConfig, middleware, securityConfig);
};

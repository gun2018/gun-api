'use strict';
const pluginConfig = {
  session: {
    key: 'GUN_SESS',
    maxAge: 24 * 3600 * 1000, // one day
    httpOnly: true,
    overwrite: true,
    encrypt: true,
    // domain: '.gun-m-temp.yefun.top',
  },
  redis: {
    clients: {
      session: {
        host: '127.0.0.1',
        port: '6379',
        password: 'gun2017',
        db: 0,
      },
    },
  },
  sessionRedis: {
    name: 'session',
  },
};

const securityConfig = {
  cors: {
    credentials: true,
  },
  security: {
    domainWhiteList: ['.yefun.top', 'yefun.top'],
    csrf: {
      enable: false,
    },
  },
};

const middleware = {
  middleware: ['updateSession'],
  //other config for middleware
};

module.exports = () => {
  return Object.assign(
    { keys: 'gun2017' },
    pluginConfig,
    middleware,
    securityConfig
  );
};

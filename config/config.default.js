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
  },
  session: {
    key: 'GUN_SESS',
    maxAge: 24 * 3600 * 1000, // one day
    httpOnly: true,
    overwrite: true,
    encrypt: true,
    // domain: '.com',
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
    domainWhiteList: ['http://gun.com'],
    csrf: {
      headerName: 'x-csrf-token',
      // useSession: true,
      // cookieName: 'csrfToken',
      // sessionName: 'csrfToken', //等前端环境搭好
    },
  },
};

const middleware = {
  middleware: ['updateSession'],
  //other config for middleware
};


module.exports = () => {
  return Object.assign({keys: 'gun2017'}, pluginConfig, middleware, securityConfig);
};

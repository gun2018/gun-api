'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.get('/', 'main.index');
  app.post('/wx_login', app.controller.user.wxLogin);
  app.get('/check_auth', app.controller.user.checkAuth);
  app.get('/graphiql', app.controller.graphql.graphiql);
  app.post('/graphql', app.controller.graphql.graphql);
};

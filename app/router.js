'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/post')(app);

  app.get('/', 'main.index');
};

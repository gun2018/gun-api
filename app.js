const Knex = require('knex');

module.exports = app => {
  Object.defineProperty(app, 'knex', {
    writable: false,
    value: Knex(app.config.knex.gun),
  });
};

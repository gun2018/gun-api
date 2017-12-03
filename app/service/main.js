'use strict';

module.exports = app => {
  return class MainSercive extends app.Service {
    index() {
      return 'hello index';
    }
  };
};

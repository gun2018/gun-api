'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = ({ router, controller }) => {
  
  router.get('/', controller.home.index);
};

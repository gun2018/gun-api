'use strict';

module.exports = app => {
  return class HomeController extends app.Controller {

    async index() {
      const { ctx } = this;
      ctx.body = ctx.session.user;
      ctx.body = {
        code: 0,
        data: '哈哈哈'
      };
    }
  };
};

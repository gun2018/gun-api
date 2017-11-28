'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      const {ctx, service} = this;

      ctx.body = await service.home.find();
    }
  }
  return HomeController;
};

'use strict';

module.exports = app => {
  return class User extends app.Service {
    async find() {
      const {ctx} = this;

      const user = await app.mysql.select('users');
      ctx.session.visited = ctx.session.visited ? ++ctx.session.visited : 1;
      console.log(ctx.session.visited);
      return {
        user,
      };
    }
  };
};

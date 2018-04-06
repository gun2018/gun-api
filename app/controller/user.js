'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    async wxLogin() {
      const { ctx, service: { user: UserService } } = this;
      const { code } = ctx.request.body;
      // const { limit, page } = ctx.request.query;
      const user = await UserService.wxLogin(code);
      ctx.session = { user };
      ctx.body = signMsg(0, { success: true }, makeUserRes(user));
    }
    async checkAuth() {
      const { ctx } = this;
      console.log('user', ctx.session);
      const { user } = ctx.session;
      ctx.body = signMsg(0, { success: true }, makeUserRes(user));
    }
  };
};

function signMsg(code, msg, data) {
  return {
    code,
    msg,
    data,
  };
}

function makeUserRes(user) {
  return {
    open_id: user.openid,
    nickname: user.nickname,
    sex: user.sex,
    language: user.language,
    city: user.city,
    province: user.province,
    country: user.country,
    headimgurl: user.headimgurl,
  };
}

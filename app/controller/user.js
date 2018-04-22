'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    async wxLogin() {
      const {
        ctx,
        service: { user: UserService },
      } = this;
      const { code } = ctx.request.body;
      // const { limit, page } = ctx.request.query;
      const user = await UserService.wxLogin(code);
      ctx.session = { user };
      ctx.success(makeUserRes(user));
    }
    async checkAuth() {
      const { ctx } = this;
      const { user } = ctx.session;
      if (user) {
        ctx.success(makeUserRes(user));
      } else {
        ctx.fail(ctx.ERR_CODE.FAIL_AUTH);
      }
    }
    async simulateLogin() {
      const {
        ctx,
        service: { user: UserService },
      } = this;
      const user = await UserService.getUserByOpenId('nonono');
      ctx.session = { user };
      ctx.success(makeUserRes(user));
    }
  };
};

function makeUserRes(user) {
  return {
    id: user.id,
    open_id: user.openId,
    nickname: user.nickname,
    sex: user.sex,
    city: user.city,
    province: user.province,
    country: user.country,
    avatar_url: user.avatarUrl,
    sign_text: user.signText,
    fan_count: user.fanCount || 0,
    follower_count: user.followerCount || 0,
  };
}

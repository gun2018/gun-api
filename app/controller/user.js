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
      console.log('user', ctx.session);
      const { user } = ctx.session;
      if (user) {
        ctx.success(makeUserRes(user));
      } else {
        ctx.fail(ctx.ERR_CODE.FAIL_AUTH);
      }
    }
    async simulateLogin() {
      const { ctx } = this;
      const user = {
        id: 2,
        openid: 'nonono',
        nickname: '模拟用户哈',
        sex: 1,
        city: '汕尾',
        province: '广东',
        country: '中国',
        avatar_url:
          'http://himg.bdimg.com/sys/portrait/item/c1b662616279e8bfaae8bfa6e587b9e587b8e69bbc202a.jpg',
        signText: '帅气的个性签名哈',
      };
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
    followers: user.followers,
    fans: user.fans,
  };
}

'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    async wxLogin() {
      const { ctx, service: { user: UserService } } = this;
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
        language: 'zh-cn',
        city: '汕尾',
        province: '广东',
        country: '中国',
        headimgurl:
          'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKiboeh23vhCNjJTxlXbs9mLiagiczy8Wd6gIxviaV4vpUyOso741Qz53XDdKyAkTH4Iic7SPkkax8xO0g/132',
      };
      ctx.session = { user };
      ctx.success(makeUserRes(user));
    }
  };
};

function makeUserRes(user) {
  return {
    id: user.id,
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

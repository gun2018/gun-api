'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    async signin() {
      const { ctx, service } = this;
      const { nickname, email, password } = ctx.request.body;
      const user = await service.user.find({ nickname, email, password });
      
      if (!user) return ctx.body = signMsg(0, { nomal: '用户名或密码错误' });
      //update csrfToken
      ctx.rotateCsrfSecret();

      ctx.session = { user };
      ctx.body = signMsg(1, { success: true }, user);
    }

    async signup() {
      //judge nickname, email, password, emailCode
      //ignore XSS temporarily!
      const { ctx, service: { user: UserService } } = this;
      const { nickname, email, emailCode, password } = ctx.request.body;

      const isNicknameExisted = await UserService.isExisted({ nickname });
      if (isNicknameExisted) return ctx.body = signMsg(0, { nickname: '用户名已被使用' });

      const isEmailExisted = await UserService.isExisted({ email });
      if (isEmailExisted) return ctx.body = signMsg(0, { email: '邮箱已被使用' });

      const isEmailCodeRight = emailCode === '6666';
      if (!isEmailCodeRight) return ctx.body = signMsg(0, { email: '验证码错误' });

      const isSave = await UserService.save({ nickname, email, password });
      if (!isSave) return ctx.throw(500);

      const user = await UserService.find({ nickname });
      ctx.session = { user };
      ctx.body = signMsg(1, { success: true }, user);
    }
  };
};

function signMsg(status, msg, userdata) {
  return {
    status, 
    msg,
    userdata,
  };
}

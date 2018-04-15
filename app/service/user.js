// const bcrypt = require('bcrypt');
const axios = require('axios');

module.exports = app => {
  return class UserService extends app.Service {
    async wxLogin(code) {
      const { appId, appSecret } = app.config;
      const getAccessTokenRes = await axios.get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`,
      );

      console.log('getAccessTokenRes', getAccessTokenRes.data);
      const {
        access_token: accessToken,
        openid: openId,
      } = getAccessTokenRes.data;

      if (!accessToken || !openId) {
        this.ctx.error({
          code: this.ctx.ERR_CODE.AUTH.WX_ACCESS_TOKEN_FAIL,
        });
      }

      const getUserInfoRes = await axios.get(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`,
      );
      console.log('getUserInfoRes', getUserInfoRes.data);
      const user = {
        ...getAccessTokenRes.data,
        ...getUserInfoRes.data,
      };
      console.log('user', user);
      const isUserExist = await this.getUserByOpenId(user.openid);
      if (!isUserExist) {
        await app.knex('user').insert({
          open_id: user.openid,
          nickname: user.nickname,
          avatar_url: user.headimgurl,
          sex: user.sex,
          country: user.country,
          province: user.province,
          city: user.city,
        });
      }
      // console.log('knex', app.knex);
      return user;
    }
    async getUserByOpenId(openId) {
      const userRes = await app
        .knex('user')
        .select('id')
        .where({ open_id: openId });
      return userRes[0] ? userRes[0].id : userRes[0];
    }
  };
};

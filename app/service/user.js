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
      const isUserExist = await this.getUserByOpenId(openId);
      let userInsertRes;
      if (!isUserExist) {
        userInsertRes = await app.knex('user').insert({
          open_id: getAccessTokenRes.data.openid,
          nickname: getUserInfoRes.data.nickname,
          avatar_url: getUserInfoRes.data.headimgurl,
          sex: getUserInfoRes.data.sex,
          country: getUserInfoRes.data.country,
          province: getUserInfoRes.data.province,
          city: getUserInfoRes.data.city,
        });
        console.log('userInsertRes', userInsertRes);
      }
      // console.log('knex', app.knex);
      return {
        id: isUserExist || userInsertRes[0],
        ...getAccessTokenRes.data,
        ...getUserInfoRes.data,
      };
    }
    async getUserByOpenId(openId) {
      const userRes = await app
        .knex('user')
        .select('id')
        .where({ open_id: openId });
      console.log('userRes', userRes);
      return userRes[0] ? userRes[0].id : userRes[0];
    }
  };
};

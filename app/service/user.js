// const bcrypt = require('bcrypt');
const axios = require('axios');

module.exports = app => {
  return class UserService extends app.Service {
    async wxLogin(code) {
      const { appId, appSecret } = app.config;
      const getAccessTokenRes = await axios.get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`,
      );
      const accessToken = getAccessTokenRes.data.access_token;
      const openId = getAccessTokenRes.data.openid;

      const getUserInfoRes = await axios.get(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`,
      );
      const a = {
        ...getAccessTokenRes.data,
        ...getUserInfoRes.data,
      };
      return a;
    }
  };
};

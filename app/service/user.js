// const bcrypt = require('bcrypt');
const axios = require('axios');
const { graphQuery } = require('../schema/util');

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

      console.log('getAccessTokenRes', getAccessTokenRes.data);
      console.log('getUserInfoRes', getUserInfoRes.data);
      const userInfo = await this.getUserByOpenId(openId);
      // 如果 userInfo 存在 则返回 userInfo 就可以了？？？？
      if (userInfo) {
        return {
          ...userInfo,
          accessToken: getAccessTokenRes.data.access_token,
          refreshTokeon: getAccessTokenRes.data.refresh_tokeon,
        };
      }

      const userInsertRes = await app.knex('user').insert({
        open_id: getAccessTokenRes.data.openid,
        nickname: getUserInfoRes.data.nickname,
        avatar_url: getUserInfoRes.data.headimgurl,
        sex: getUserInfoRes.data.sex,
        country: getUserInfoRes.data.country,
        province: getUserInfoRes.data.province,
        city: getUserInfoRes.data.city,
      });

      return {
        id: userInsertRes[0],
        openId: getUserInfoRes.data.openid,
        nickname: getUserInfoRes.data.nickname,
        sex: getUserInfoRes.data.sex,
        city: getUserInfoRes.data.city,
        province: getUserInfoRes.data.province,
        country: getUserInfoRes.data.country,
        avatarUrl: getUserInfoRes.data.headimgurl,
        accessToken: getAccessTokenRes.data.access_token,
        refreshTokeon: getAccessTokenRes.data.refresh_tokeon,
      };

      // console.log('knex', app.knex);
    }
    async getUserByOpenId(openId) {
      const gql = `
      {
        user(openId: "${openId}") {
          id
          openId
          nickname
          sex
          city
          province
          country
          avatarUrl
          signText
          followers {
            id
            nickname
            avatarUrl
          }
          fans {
            id
            nickname
            avatarUrl
          }
        }
      }`;
      const userRes = await graphQuery(gql);
      return userRes.data.user;
    }
  };
};

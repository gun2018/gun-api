/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  // GraphQLList,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const User = new GraphQLObjectType({
  description: '文章段落',
  name: 'User',
  sqlDatabase: 'gun',
  sqlTable: 'user',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： 0-删除、1-可用',
      isArg: true,
    },
    openId: {
      type: GraphQLString,
      isArg: true,
      sqlColumn: 'open_id',
    },
    nickname: {
      type: GraphQLString,
    },
    avatarUrl: {
      type: GraphQLString,
      sqlColumn: 'avatar_url',
    },
    country: {
      type: GraphQLString,
    },
    province: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    sex: {
      type: GraphQLInt,
    },
    signText: {
      type: GraphQLString,
      sqlColumn: 'sign_text',
    },
    createTime: {
      type: GraphQLDateTime,
      sqlColumn: 'create_time',
      description: '创建时间',
    },
    updateTime: {
      type: GraphQLDateTime,
      sqlColumn: 'update_time',
      description: '更新时间',
    },
    fanStatus: {
      type: GraphQLInt, // 关联粉丝表时使用
    },
    fanCount: {
      type: GraphQLInt,
      description: '粉丝数量',
      sqlExpr: table =>
        `(SELECT count(*) FROM fan WHERE status = 1 AND user_id = ${table}.id)`,
    },
    followerCount: {
      type: GraphQLInt,
      description: '关注数量',
      sqlExpr: table =>
        `(SELECT count(*) FROM follower WHERE status = 1 AND user_id = ${table}.id)`,
    },
    // 下面这两个字段好像用不到
    // fans: {
    //   type: new GraphQLList(User),
    //   description: '粉丝',
    //   where: () => `fan.status = 1`, //过滤掉取消关注的
    //   junction: {
    //     sqlTable: 'fan',
    //     include: {
    //       fanStatus: {
    //         sqlColumn: 'status',
    //       },
    //     },
    //     sqlJoins: [
    //       (user, fan) => `${user}.id = ${fan}.user_id`,
    //       (fan, user) => `${fan}.fan_id = ${user}.id`,
    //     ],
    //   },
    // },
    // followers: {
    //   type: new GraphQLList(User),
    //   description: '关注的人',
    //   where: () => `follower.status = 1`, //过滤掉取消关注的
    //   junction: {
    //     sqlTable: 'follower',
    //     sqlJoins: [
    //       (user, follower) => `${user}.id = ${follower}.user_id`,
    //       (follower, user) => `${follower}.follower_id = ${user}.id`,
    //     ],
    //   },
    // },
  }),
});

module.exports = User;

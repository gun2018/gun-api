/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { hasOne } = require('../../../lib/easy-monster');

const User = require('../user/User');
// const ThinkingLike = require('./ThinkingLike');
const dbCall = require('../../../lib/easy-monster/dbCall');

const Thinking = new GraphQLObjectType({
  description: '观点',
  name: 'Thinking',
  sqlDatabase: 'gun',
  sqlTable: 'thinking',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： 0-删除、1-可用',
      isArg: true,
    },
    content: {
      type: GraphQLString,
      description: '内容',
    },
    userId: {
      type: GraphQLInt,
      sqlColumn: 'user_id',
      isArg: true,
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id',
      description: '对应的文章Id',
      isArg: true,
    },
    likeCount: {
      type: GraphQLInt,
      description: '点赞的数量',
      sqlExpr: table => {
        return `(SELECT count(*) FROM thinking_like WHERE status = 1 AND thinking_id = ${table}.id)`;
      },
    },
    isLike: {
      type: GraphQLBoolean,
      resolve: async ({ id }, args, ctx) => {
        const userId = ctx.user.id;
        const thinkingId = id;
        const sql = `SELECT user_id FROM thinking_like where user_id=${userId} AND thinking_id=${thinkingId} AND status = 1`;
        const result = await dbCall(sql, ctx);
        return (result[0] && result[0].user_id) || false;
      },
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
    owner: hasOne(User, {
      description: '想法提出者',
      thisKey: 'user_id',
      foreignKey: 'id',
    }),
  }),
});

module.exports = Thinking;

/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
// const { hasMany } = require('../../../lib/easy-monster');

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
      description: '状态： -1-已删除、0-默认、1-可用、2-过期',
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
  }),
});

module.exports = User;

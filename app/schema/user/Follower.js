/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { hasOne } = require('../../../lib/easy-monster');
const User = require('./User');

const Follower = new GraphQLObjectType({
  description: '关注的人',
  name: 'Follower',
  sqlDatabase: 'gun',
  sqlTable: 'follower',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： 0-删除、1-可用',
      isArg: true,
    },
    userId: {
      type: GraphQLInt,
      isArg: true,
      sqlColumn: 'user_id',
    },
    followerId: {
      type: GraphQLInt,
      isArg: true,
      sqlColumn: 'follower_id',
    },
    info: hasOne(User, {
      description: '粉丝信息',
      thisKey: 'follower_id',
      foreignKey: 'id',
    }),
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

module.exports = Follower;

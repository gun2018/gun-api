/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
// const { hasMany } = require('../../../lib/easy-monster');

const PostLike = new GraphQLObjectType({
  description: '文章点赞',
  name: 'PostLike',
  sqlDatabase: 'gun',
  sqlTable: 'post_like',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： -1-已删除、0-默认、1-可用、2-过期',
      isArg: true,
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id',
      description: '对应的文章Id',
      isArg: true,
    },
    userId: {
      type: GraphQLInt,
      sqlColumn: 'user_id',
      description: '点赞用户Id',
      isArg: true,
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

module.exports = PostLike;

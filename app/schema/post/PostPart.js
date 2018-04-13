/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
// const { hasMany } = require('../../../lib/easy-monster');

const PostPart = new GraphQLObjectType({
  description: '文章段落',
  name: 'PostPart',
  sqlDatabase: 'gun',
  sqlTable: 'post_part',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： -1-已删除、0-默认、1-可用、2-过期',
      isArg: true,
    },
    content: {
      type: GraphQLString,
      description: '标题',
    },
    type: {
      type: GraphQLInt,
      description: ' 1.段落 2.时间点',
    },
    happenTime: {
      sqlColumn: 'happen_time',
      type: GraphQLDateTime,
      description: '发生时间',
    },
    order: {
      type: GraphQLInt,
      description: '段落顺序',
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id',
      description: '对应的文章Id',
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

module.exports = PostPart;

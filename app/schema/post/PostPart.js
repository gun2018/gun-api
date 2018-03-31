/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
// const { hasMany } = require('../../../lib/easy-monster');

const Post = new GraphQLObjectType({
  description: '文章段落',
  name: 'Post',
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
    createTime: {
      type: GraphQLDateTime,
      sqlColumn: 'create_time',
      description: '创建时间',
    },
  }),
});

module.exports = Post;

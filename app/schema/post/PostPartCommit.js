/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { hasOne } = require('../../../lib/easy-monster');
const User = require('../user/User');

const PostPartCommit = new GraphQLObjectType({
  description: '文章段落的commit',
  name: 'PostPartCommit',
  sqlDatabase: 'gun',
  sqlTable: 'post_part_commit',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      type: GraphQLInt,
      isArg: true,
    },
    userId: {
      type: GraphQLInt,
      isArg: true,
      sqlColumn: 'user_id',
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id',
      isArg: true,
    },
    postPartId: {
      type: GraphQLInt,
      sqlColumn: 'post_part_id',
      isArg: true,
    },
    commitName: {
      type: GraphQLString,
      sqlColumn: 'commit_name',
      description: '内容',
    },
    content: {
      type: GraphQLString,
      description: '内容',
    },
    source: {
      type: GraphQLString,
      description: '来源',
    },
    seq: {
      type: GraphQLInt,
      description: '排序',
    },
    happenTime: {
      sqlColumn: 'happen_time',
      type: GraphQLDateTime,
      description: '发生时间',
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
    status: {
      type: GraphQLInt,
      description: '状态： -1-已拒绝 0-待合并 1-已合并',
      isArg: true,
    },
    user: hasOne(User, {
      description: '提交申请的用户',
      thisKey: 'user_id',
      foreignKey: 'id',
    }),
  }),
});

module.exports = PostPartCommit;

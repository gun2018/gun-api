/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
// const { hasMany } = require('../../../lib/easy-monster');

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
      description: '状态： -1-已删除、0-默认、1-可用、2-过期',
      isArg: true,
    },
    content: {
      type: GraphQLString,
      description: '内容',
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id',
      description: '对应的文章Id',
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

module.exports = Thinking;

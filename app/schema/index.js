'use strict';
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const post = require('./post');
const thinking = require('./thinking');
const user = require('./user');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '查询接口',
    fields: () => ({
      ...post.query,
      ...thinking.query,
      ...user.query,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: '更新接口',
    fields: () => ({
      ...post.mutation,
      ...thinking.mutation,
      ...user.mutation,
    }),
  }),
  description: '网校GraphQL',
});

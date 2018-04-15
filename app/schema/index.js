'use strict';
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const post = require('./post');
const thinking = require('./thinking');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '查询接口',
    fields: () => ({
      ...post.query,
      ...thinking.query,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: '更新接口',
    fields: () => ({
      ...post.mutation,
      ...thinking.mutation,
    }),
  }),
  description: '网校GraphQL',
});

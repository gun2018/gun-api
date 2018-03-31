// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const Post = require('./Post');

module.exports = {
  query: {
    post: queryBuilder(Post),
    posts: queryBuilder(new GraphQLList(Post)),
  },
  mutation: {
    createPost: createBuilder({
      type: Post,
      description: '新建文章',
    }),
  },
};

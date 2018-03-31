// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
} = require('../../../lib/easy-monster/index');

const Post = require('./Post');

module.exports = {
  query: {
    post: queryBuilder(Post),
  },
  mutation: {
    createPost: createBuilder({
      type: Post,
      description: '新建文章',
    }),
  },
};

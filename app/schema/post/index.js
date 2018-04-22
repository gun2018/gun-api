// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
  deleteBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const Post = require('./Post');
const PostLike = require('./PostLike');

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
    createPostLike: createBuilder({
      type: PostLike,
      description: '点赞',
    }),
    deletePostLike: deleteBuilder({
      type: PostLike,
      description: '取消点赞',
    }),
  },
};

// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
  deleteBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const Post = require('./Post');
const PostPart = require('./PostPart');
const PostPartCommit = require('./PostPartCommit');
const PostLike = require('./PostLike');

module.exports = {
  query: {
    post: queryBuilder(Post),
    posts: queryBuilder(new GraphQLList(Post)),
    postPartCommit: queryBuilder(PostPartCommit),
    postPartCommits: queryBuilder(new GraphQLList(PostPartCommit)),
  },
  mutation: {
    createPost: createBuilder({
      type: Post,
      description: '新建文章',
    }),
    createPostPart: createBuilder({
      type: PostPart,
      description: '合并提交请求',
    }),
    crearePostPartCommit: createBuilder({
      type: PostPartCommit,
      description: '新建提交请求',
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

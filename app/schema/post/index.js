// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
  deleteBuilder,
  updateBuilder,
} = require('../../../lib/easy-monster/index');
const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

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
    mergePostPartCommit: {
      type: PostPartCommit,
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'MergePostPartCommit',
              fields: () => ({
                postPartCommitId: {
                  type: GraphQLInt,
                },
                postPartId: {
                  type: GraphQLInt,
                },
                seq: {
                  type: GraphQLInt,
                },
                content: {
                  type: GraphQLString,
                },
              }),
            }),
          ),
        },
      },
      resolve: async (
        _,
        { input: { postPartCommitId, postPartId, seq, content } },
        ctx,
      ) => {
        await ctx.knex.transaction(async transaction => {
          await ctx
            .knex('post_part_commit')
            .transacting(transaction)
            .where({
              id: postPartCommitId,
            })
            .update({
              status: 1,
            });
          await ctx
            .knex('post_part')
            .transacting(transaction)
            .where({
              id: postPartId,
            })
            .update({
              content,
              merge_count: seq,
            });
        });
      },
    },
    updatePostPartCommit: updateBuilder({
      type: PostPartCommit,
      description: '处理提交请求',
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

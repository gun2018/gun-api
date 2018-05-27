/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { hasMany, hasOne } = require('../../../lib/easy-monster');
const PostPart = require('./PostPart');
const PostLike = require('./PostLike');
const Thinking = require('../thinking/Thinking');
const User = require('../user/User');
const dbCall = require('../../../lib/easy-monster/dbCall');

const Post = new GraphQLObjectType({
  description: '文章',
  name: 'Post',
  sqlDatabase: 'gun',
  sqlTable: 'post',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLInt, isArg: true },
    status: {
      type: GraphQLInt,
      description: '状态： 0-删除、1-可用',
      isArg: true,
    },
    authorId: {
      type: GraphQLInt,
      sqlColumn: 'author_id',
      description: '文章发起人id',
      isArg: true,
    },
    title: {
      type: GraphQLString,
      isArg: true,
      description: '标题',
    },
    brief: {
      type: GraphQLString,
      description: '文章简介',
    },
    cover: {
      type: GraphQLString,
      description: '文章头图',
    },
    category: {
      type: GraphQLString,
      description: '文章类型',
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
    detail: hasMany(PostPart, {
      description: '文章详情',
      thisKey: 'id',
      foreignKey: 'post_id',
    }),
    likeCount: {
      type: GraphQLInt,
      description: '点赞的数量',
      sqlExpr: table => {
        return `(SELECT count(*) FROM post_like WHERE status = 1 AND post_id = ${table}.id)`;
      },
    },
    thinkingCount: {
      type: GraphQLInt,
      description: '观点数量',
      sqlExpr: table => {
        return `(SELECT count(*) FROM thinking WHERE status = 1 AND post_id = ${table}.id)`;
      },
    },
    titleCommitCount: {
      type: GraphQLInt,
      description: '标题提交的数量',
      sqlExpr: table => {
        return `(SELECT count(*) FROM post_commit WHERE post_id = ${table}.id)`;
      },
    },
    contentCommitCount: {
      type: GraphQLInt,
      description: '内容提交的数量',
      sqlExpr: table => {
        return `(SELECT count(*) FROM post_part_commit WHERE post_id = ${table}.id)`;
      },
    },
    isLike: {
      type: GraphQLBoolean,
      resolve: async ({ id }, args, ctx) => {
        console.log('argument', args);
        const userId = ctx.user.id;
        const postId = id;
        const sql = `SELECT user_id FROM post_like where user_id=${userId} AND post_id=${postId} AND status = 1`;
        const result = await dbCall(sql, ctx);
        return (result[0] && result[0].user_id) || false;
      },
    },
    author: hasOne(User, {
      description: '文章发起人',
      thisKey: 'author_id',
      foreignKey: 'id',
    }),
    like: hasMany(PostLike, {
      description: '点赞',
      thisKey: 'id',
      foreignKey: 'post_id',
    }),
    thinking: hasMany(Thinking, {
      description: '观点',
      thisKey: 'id',
      foreignKey: 'post_id',
    }),
  }),
});

module.exports = Post;

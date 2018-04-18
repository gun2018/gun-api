/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { hasMany } = require('../../../lib/easy-monster');
const PostPart = require('./PostPart');
const PostLike = require('./PostLike');
const Thinking = require('../thinking/Thinking');

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
      description: '状态： -1-已删除、0-默认、1-可用、2-过期',
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

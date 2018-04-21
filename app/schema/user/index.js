// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
  deleteBuilder,
  updateBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const User = require('./User');
const Fan = require('./Fan');
const Follower = require('./Follower');
module.exports = {
  query: {
    user: queryBuilder(User),
    users: queryBuilder(new GraphQLList(User)),
    fan: queryBuilder(Fan),
    fans: queryBuilder(new GraphQLList(Fan)),
    follower: queryBuilder(Follower),
    followers: queryBuilder(new GraphQLList(Follower)),
  },
  mutation: {
    createUser: createBuilder({
      type: User,
      description: '新用户',
    }),
    createFan: createBuilder({
      type: Fan,
      description: '点击关注，增加粉丝',
    }),
    deleteFan: deleteBuilder({
      type: Fan,
      description: '删除粉丝',
    }),
    createFollower: createBuilder({
      type: Follower,
      description: '关注某人',
    }),
    deleteFollower: deleteBuilder({
      type: Follower,
      description: '取消关注',
    }),
    updateFollower: updateBuilder({
      type: Follower,
      description: '更新',
    }),
  },
};

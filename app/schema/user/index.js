// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const User = require('./User');

module.exports = {
  query: {
    user: queryBuilder(User),
    users: queryBuilder(new GraphQLList(User)),
  },
  mutation: {
    createUser: createBuilder({
      type: User,
      description: '新用户',
    }),
  },
};

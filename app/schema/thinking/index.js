// const { GraphQLList } = require('graphql');
const {
  queryBuilder,
  createBuilder,
} = require('../../../lib/easy-monster/index');
const { GraphQLList } = require('graphql');

const Thinking = require('./Thinking');

module.exports = {
  query: {
    thinkings: queryBuilder(new GraphQLList(Thinking)),
    thinking: queryBuilder(Thinking),
  },
  mutation: {
    createThinking: createBuilder({
      type: Thinking,
      description: '新建观点',
    }),
  },
};

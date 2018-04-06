'use strict';
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');

const schema = require('../schema');

console.log(schema);

module.exports = app => {
  class GraphQLController extends app.Controller {
    async graphql() {
      const { ctx } = this;
      await graphqlKoa({
        schema,
        context: { user: ctx.session, knex: app.knex, app },
      })(ctx);
    }
    async graphiql() {
      const { ctx } = this;
      await graphiqlKoa({ endpointURL: '/graphql' })(ctx);
    }
  }

  return GraphQLController;
};

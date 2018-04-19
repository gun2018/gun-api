const { graphql } = require('graphql');
const schema = require('./index');
const Knex = require('knex');
const config = require('../../config/config');

const knex = Knex(config.knex.gun);

const graphQuery = async gql => {
  return graphql(schema, gql, null, { knex });
};

module.exports = {
  graphQuery,
  knex,
};

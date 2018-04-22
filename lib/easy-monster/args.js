const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');

function getArgsFromFields(fields) {
  return Object.entries(fields)
    .filter(([, field]) => field.isArg)
    .reduce((args, [name, { sqlColumn, type }]) => {
      const a = Object.assign({}, args, {
        [name]: {
          sqlColumn,
          type: type instanceof GraphQLNonNull ? type.ofType : type,
        },
      });
      return a;
    }, {});
}

function getArgs(graphQLType) {
  if (graphQLType instanceof GraphQLList) {
    return getArgsFromFields(graphQLType.ofType.getFields());
  }

  if (graphQLType instanceof GraphQLObjectType) {
    return getArgsFromFields(graphQLType.getFields());
  }
  return {};
}

module.exports = getArgs;

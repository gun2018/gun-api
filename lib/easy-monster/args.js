const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');

function getArgsFromFields(fields) {
  return Object.entries(fields)
    .filter(([, field]) => field.isArg)
    .reduce(
      (args, [name, { sqlColumn, type }]) =>
        Object.assign({}, args, {
          [name]: {
            sqlColumn,
            type: type instanceof GraphQLNonNull ? type.ofType : type,
          },
        }),
      {}
    );
}

function getArgs(graphQLType) {
  console.log('graphQLType', graphQLType);
  if (graphQLType instanceof GraphQLList) {
    return getArgsFromFields(graphQLType.ofType.getFields());
  }

  if (graphQLType instanceof GraphQLObjectType) {
    return getArgsFromFields(graphQLType.getFields());
  }
  return {};
}

module.exports = getArgs;

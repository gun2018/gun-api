const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  isLeafType,
} = require('graphql');

// 根据 GraphQLObjectType 生成 inputType
function makeInputType(graphQLType) {
  if (graphQLType instanceof GraphQLObjectType) {
    const inputType = new GraphQLInputObjectType(
      Object.assign({}, graphQLType._typeConfig, {
        name: `Add${graphQLType.name}Input`,
        description: `${graphQLType.description}更新类型`,
        fields: () =>
          Object.entries(graphQLType._typeConfig.fields()).reduce(
            (allField, [name, { ...param }]) => {
              if (isLeafType(param.type)) {
                return Object.assign({}, allField, {
                  [name]: param,
                });
              } else if (param.type instanceof GraphQLNonNull) {
                return Object.assign({}, allField, {
                  [name]: Object.assign(param, {
                    type: param.type.ofType,
                  }),
                });
              }
              return allField;
            },
            {}
          ),
      })
    );
    return inputType;
  }
  return graphQLType;
}

function sqlArgsOf(args, withFields) {
  return Object.entries(args).reduce((allArgs, [name, value]) => {
    return {
      ...allArgs,
      [withFields[name].sqlColumn || name]: value,
    };
  }, {});
}

exports.createBuilder = ({ type, inputType, description }) => {
  const ArgsInputType = inputType || makeInputType(type);
  return {
    type,
    args: {
      input: {
        type: new GraphQLNonNull(ArgsInputType),
      },
    },
    description,
    resolve: async (value, { input }, ctx) => {
      const fieldList = ArgsInputType.getFields();
      const target = sqlArgsOf(input, fieldList);
      const insertRes = await ctx
        .knex(ArgsInputType._typeConfig.sqlTable)
        .insert(target);
      if (insertRes && insertRes[0]) {
        return {
          id: insertRes[0],
        };
      }
      return {};
    },
  };
};

exports.BatchCreateBuilder = ({ type, inputType, description }) => {
  const ArgsInputType = inputType || makeInputType(type);
  return {
    type,
    args: {
      input: {
        type: new GraphQLNonNull(ArgsInputType),
      },
    },
    description,
    resolve: async (value, { input }, ctx) => {
      const fieldList = ArgsInputType.getFields();
      const target = sqlArgsOf(input, fieldList);
      const insertRes = await ctx
        .knex(ArgsInputType._typeConfig.sqlTable)
        .insert(target);
      if (insertRes && insertRes[0]) {
        return {
          id: insertRes[0],
        };
      }
      return {};
    },
  };
};

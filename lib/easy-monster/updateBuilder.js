const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  isLeafType,
} = require('graphql');

// 根据 GraphQLObjectType 生成 inputType
function makeInputType(graphQLType, isDelete) {
  if (graphQLType instanceof GraphQLObjectType) {
    const inputType = new GraphQLInputObjectType(
      Object.assign({}, graphQLType._typeConfig, {
        name: isDelete
          ? `Delete${graphQLType.name}Input`
          : `Update${graphQLType.name}Input`,
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

function sqlArgsOf(args, withFields, isQuery) {
  if (isQuery && Object.keys(args).includes('id')) {
    return {
      id: args.id,
    };
  }
  return Object.entries(args).reduce((allArgs, [name, value]) => {
    if (isQuery && !withFields[name].isArg) {
      return allArgs;
    }
    return {
      ...allArgs,
      [withFields[name].sqlColumn || name]: value,
    };
  }, {});
}

exports.updateBuilder = ({ type, inputType, description }) => {
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
      const query = sqlArgsOf(input, fieldList, true);

      return await ctx
        .knex(ArgsInputType._typeConfig.sqlTable)
        .where(query)
        .update(target);
    },
  };
};

exports.deleteBuilder = ({ type, inputType, description }) => {
  const ArgsInputType = inputType || makeInputType(type, true);
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
      const query = sqlArgsOf(input, fieldList, true);
      await ctx
        .knex(ArgsInputType._typeConfig.sqlTable)
        .where(query)
        .update({
          status: 0,
        });
      return {
        id: input.id,
      };
    },
  };
};

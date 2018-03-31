const { GraphQLList } = require('graphql');
const getArgs = require('./args');

exports.hasOne = (type, config) => ({
  type,
  description: config.description || '',
  sqlJoin: (fromTable, toTable) =>
    `${fromTable}.${config.thisKey} = ${toTable}.${config.foreignKey || 'id'}`,
});

exports.hasMany = (type, config) => {
  const listType = new GraphQLList(type);
  return {
    type: listType,
    description: config.description || '',
    args: getArgs(listType),
    orderBy: args => {
      if (!args._sort) {
        return null;
      }
      const [key, value] = args._sort.split(' ');
      return {
        [key]: value.toUpperCase(),
      };
    },
    sqlJoin: (fromTable, toTable, args) => {
      let clause = `${fromTable}.${
        config.thisKey
      } = ${toTable}.${config.foreignKey || 'id'}`;
      Object.entries(args).forEach(([key, value]) => {
        const valueNew = isNaN(value) ? `'${value}'` : value;
        clause += ` and ${toTable}.${key} = ${valueNew}`;
      });
      return clause;
    },
  };
};

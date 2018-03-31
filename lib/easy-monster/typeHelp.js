const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLError,
} = require('graphql');
const { Kind } = require('graphql/language');
/**
 * 分页类型
 */
exports.GraphQLPagination = new GraphQLInputObjectType({
  name: 'Pagination',
  fields: {
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: GraphQLInt },
  },
});

function parseDate(value) {
  if (typeof value !== 'string')
    throw new TypeError('Field error: value is not an instance of string');

  const result = new Date(value);
  if (isNaN(result.getTime())) throw new TypeError(`Invalid date: ${value}`);

  if (value !== result.toJSON())
    throw new TypeError(
      `Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ: ${value}`
    );

  return result;
}

// 自己定制的 DateTime 类型，支持 0000-00-00 00:00:00
// TODO(Don): 感觉设计不合理
exports.GraphQLDateTimeWithZero = new GraphQLScalarType({
  name: 'DateTimeWithZero',

  // Serialize a date to send to the client.
  serialize(value) {
    // 解析0000-00-00 00:00:00失败时，返回空字符串。不能抛出异常，也不能返回null
    if (!(value instanceof Date)) return '';
    // throw new TypeError('Field error: value is not an instance of Date');

    if (isNaN(value.getTime())) return '';
    // throw new TypeError('Field error: value is an invalid Date');

    return value.toJSON();
  },

  // Parse a date received as a query variable.
  parseValue(value) {
    return parseDate(value);
  },

  // Parse a date received as an inline value.
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Can only parse strings to dates but got a: ${ast.kind}`,
        [ast]
      );
    }
    try {
      return parseDate(ast.value);
    } catch (e) {
      throw new GraphQLError(`Query error: ${e.message}`, [ast]);
    }
  },
});

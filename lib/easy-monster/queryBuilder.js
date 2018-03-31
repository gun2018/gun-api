const { GraphQLInt } = require('graphql');
const { connectionDefinitions, connectionFromArray } = require('graphql-relay');
const extend = require('extend2');
const escape = require('sqlstring').escape;
const joinMonster = require('join-monster').default;
const getArgs = require('./args');
const dbCall = require('./dbCall');

const OPTR_MAP = {
  lt: '<',
  gt: '>',
  lte: '<=',
  gte: '>=',
  eq: '=',
  neq: '!=',
};

/**
 * @param {any} resolveInfo
 * @param args
 * @param {any} context
 * @param {Function} getSql
 * @returns
 */
function joinResolver(resolveInfo, args, context, getSql = () => {}) {
  return joinMonster(
    resolveInfo,
    context,
    async sql => {
      const { first, page } = args;
      let runSql = sql;
      if (first !== undefined && page !== undefined) {
        const limit = first;
        const offset = first * (page - 1);
        runSql += ` \nLIMIT`;
        if (offset !== undefined) {
          runSql += ` ${offset},`;
        }
        runSql += ` ${limit}`;

        getSql(sql);
      }

      return dbCall(runSql, context);
    },
    {
      dialect: 'mysql',
    }
  );
}

/**
 * where 语句创建
 * @param {*} args 可查询的Args定义, 可以获取 sqlColumn 等
 * @param {*} defaults 自定义
 * @param {String} table 表名称
 * @param {*} params 查询的参数
 */
function whereCreator(args, defaults, table, params) {
  const conditions = extend({}, defaults);
  // filter 过滤掉一些排序和空的params
  Object.keys(args).forEach(key => {
    if (['orderBy', 'first', 'page'].includes(key)) return true;

    const val = params[key];
    if (val === null || val === undefined) return true; // continue

    // const sqlColumn = args[key].sqlColumn || key;
    conditions[key] = val; // 如果一个字段在参数和默认值中均赋值，则用参数中的
    return false;
  });

  let clause = '1=1';
  Object.keys(conditions).forEach(key => {
    const sqlColumn = args[key].sqlColumn || key;
    const val = conditions[key];

    if (args[key] && args[key].where) {
      clause += ` ${args[key].where(table, val)}`;
      return true;
    }

    if (val === null || val === undefined) {
      return true; // continue
    }

    if (val instanceof Array) {
      clause += ` AND ${table}.${sqlColumn} IN (${escape(val)})`;
    } else if (typeof val === 'object') {
      Object.keys(val).forEach(optr => {
        clause += ` AND ${table}.${sqlColumn} ${OPTR_MAP[optr]} ${escape(
          val[optr]
        )}`;
      });
    } else if (sqlColumn === 'after') {
      clause += ` AND ${table}.id > ${escape(val)}`;
    } else if (sqlColumn === 'before') {
      clause += ` AND ${table}.id < ${escape(val)}`;
    } else {
      clause += ` AND ${table}.${sqlColumn} = ${escape(val)}`;
    }

    return true;
  });
  return clause;
}

/**
 * join-monster中where条件的构建器
 *
 * @param {Array} args 数组，每个对象包括type、description、sqlColumn、sqlOperator等字段
 * @param {Array} defaults 数组，默认值
 * @returns
 */
function whereBuilder(args, defaults) {
  return {
    args,
    orderBy: ({ orderBy }) => {
      if (orderBy === null || orderBy === undefined) return null;
      return orderBy;
    },
    where: (table, params) => whereCreator(args, defaults, table, params),
  };
}

/**
 * GraphQL中类型定义
 *
 * @param {any} type
 * @param {any} whereClause
 * @returns
 */
function queryBuilder(type, argsHandler = args => args) {
  const argList = argsHandler(getArgs(type));
  const whereClause = whereBuilder(argList);
  return {
    type,
    ...whereClause,
    resolve: (parent, args, context, resolveInfo) =>
      joinResolver(resolveInfo, args, context),
  };
}

function queryBuilderWithPagination(type, argsHandler = args => args) {
  const argList = argsHandler({
    ...getArgs(type),
    first: {
      type: GraphQLInt,
    },
    page: {
      type: GraphQLInt,
    },
    after: {
      type: GraphQLInt,
    },
    before: {
      type: GraphQLInt,
    },
  });
  const whereClause = whereBuilder(argList);
  const { connectionType: connection } = connectionDefinitions({
    nodeType: type,
    connectionFields: {
      totalCount: { type: GraphQLInt },
    },
  });
  return {
    type: connection,
    ...whereClause,
    resolve: async (parent, oldArgs, context, resolveInfo) => {
      const args = oldArgs;
      args.first = args.first || 20;
      args.page = args.page || 1;
      let countSql;
      const joinResolverResult = await joinResolver(
        resolveInfo,
        args,
        context,
        sql => {
          countSql = sql.replace(
            /^SELECT[.\D\s]*FROM/g,
            'SELECT COUNT(*) as totalCount FROM'
          );
        }
      );
      const totalCount = await dbCall(countSql, context);
      const result = connectionFromArray(joinResolverResult, [
        { first: args.first },
      ]);
      result.totalCount = totalCount[0].totalCount;
      return result;
    },
  };
}

module.exports = { queryBuilder, queryBuilderWithPagination };

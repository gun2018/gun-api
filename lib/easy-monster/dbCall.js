module.exports = async function dbCall(runSql, context) {
  const previewSql = runSql.replace(/([\u4e00-\u9fa5])/g, str =>
    encodeURIComponent(str)
  );

  if (process.env.NODE_ENV !== 'production') {
    console.log(previewSql); // eslint-disable-line
  }

  if (context && context.response) {
    context.set(
      'X-SQL-Preview',
      `${context.response.get('X-SQL-Preview')}'%0A%0A'${previewSql
        .replace(/%/g, '%25')
        .replace(/\n/g, '%0A')}`
    );
  }
  console.log('context', context);
  const [data] = await context.knex.raw(runSql);
  return data;
};

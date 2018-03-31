module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  trailingComma: 'es5',
  printWidth: 80,

  overrides: [
    {
      files: ['app/**/*.js'],
      options: {
        trailingComma: 'all',
      },
    },
  ],
};

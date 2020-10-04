const path = require('path');

module.exports = {
  extends: ['prettier', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  env: {
    jest: true, 'jest/globals': true, browser: false, node: true,
  },
  rules: { 'no-console': 'off', camelcase: 'off' },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js'],
      },
      alias: {
        map: [
          ['@root', path.resolve(__dirname)],
          ['@kernel', path.resolve(__dirname, 'src/kernel')],
          ['@libs', path.resolve(__dirname, 'src/libs')],
          ['@stubs', path.resolve(__dirname, 'src/stubs')],
        ],
      },
    },
  },
};

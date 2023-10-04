module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2017: true
  },
  extends: ['standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2017
  },
  ignorePatterns: ['/test', 'test.js'],
  rules: {
    'no-control-regex': 0,
    'no-unused-expressions': 0,
    'space-before-function-paren': 0,
    'rest-spread-spacing': ['error', 'never']
  }
}

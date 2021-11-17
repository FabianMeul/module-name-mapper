module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    '@bothrs/eslint-config',
    '@bothrs/eslint-config/jest',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
}
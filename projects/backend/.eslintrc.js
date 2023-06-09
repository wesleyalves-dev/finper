module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/consistent-type-imports': 'off'
  },
  ignorePatterns: ['.eslintrc.js', 'dist']
}

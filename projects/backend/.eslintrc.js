module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  },
  ignorePatterns: ['.eslintrc.js']
}

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
    '@typescript-eslint/no-extraneous-class': {
      allowEmpty: 'off'
    }
  },
  ignorePatterns: ['.eslintrc.js']
}

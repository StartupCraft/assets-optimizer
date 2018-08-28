module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: false,
    jest: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      1,
      { singleQuote: true, semi: false, trailingComma: 'all' },
    ],
    'no-console': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}

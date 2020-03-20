module.exports = {
  root: true,
  env: {
    node: true
  },
  defaultSeverity: "warning",
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  linterOptions: {
    exclude: [
      "node_modules/**"
    ]
  }
}

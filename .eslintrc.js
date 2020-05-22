module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'generator-star-spacing': 'off',
    'quote-props': [0, 'always'],
    "quotes": [2, "single", "avoid-escape"],
    'no-mixed-operators': 'off',
    'template-curly-spacing': 'off',
    indent: "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

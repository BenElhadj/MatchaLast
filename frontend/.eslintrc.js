module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  env: {
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    'standard'
  ],
  rules: {
    'vue/html-self-closing': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.VUE_APP_NODE_ENV === 'production' ? 'error' : 'off'
  }
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-use-before-define': ['error', { functions: false }], // overriding
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: { 'no-unused-expressions': 'off' },
    },
  ],
};

/* eslint-env node */

// Configuration based on:
//   - https://typescript-eslint.io/getting-started
//   - https://typescript-eslint.io/linting/typed-linting
//   - https://typescript-eslint.io/linting/configs
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict"
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },
  rules: {
    // https://typescript-eslint.io/rules/consistent-type-definitions/
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    // https://typescript-eslint.io/rules/no-empty-function/
    "@typescript-eslint/no-empty-function": "off",
    // https://typescript-eslint.io/rules/no-inferrable-types/
    "@typescript-eslint/no-inferrable-types": "off",
    // https://typescript-eslint.io/rules/no-unused-vars/
    // https://eslint.org/docs/latest/rules/no-unused-vars#argsignorepattern
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "curly": "warn"
  }
};

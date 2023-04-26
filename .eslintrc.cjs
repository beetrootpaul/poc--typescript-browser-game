/* eslint-env node */

// Configuration based on:
//   - https://typescript-eslint.io/getting-started
//   - https://typescript-eslint.io/linting/typed-linting
//   - https://typescript-eslint.io/linting/configs
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict'
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    root: true,
};

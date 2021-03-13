module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': [2, { code: 80, ignorePattern: '^import .*' }],
    'sort-keys': [
      // this doesn't actually work, but the idea was to sort the functions in a class
      'error',
      'asc',
      { caseSensitive: true, natural: true, minKeys: 2 },
    ],
    'sort-vars': ['error', { ignoreCase: true }],
    'member-ordering': [true, { alphabetize: true }], // not working, not sure why
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};

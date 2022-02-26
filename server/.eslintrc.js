module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "unicorn"
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',

    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-null": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: { Param: true, Req: true, Res: true },
      },
    ],
  },
  settings: {
    ["import/parsers"]: { "@typescript-eslint/parser": [".ts", ".tsx"] },
    ["import/resolver"]: {
      node: {
        extensions: [".ts"],
      },
    },
  },
};

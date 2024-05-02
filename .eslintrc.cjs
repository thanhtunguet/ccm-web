module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  overrides: [// overriding the JS config from @react-native/eslint-config to ensure
    // that we use hermes-eslint for all js files
    {
      files: ["package.json"],
      parser: "jsonc-eslint-parser",
    },
    {
      files: ["package.json"],
      rules: {
        "lint/react-native-manifest": 2,
      },
    },
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "react-native/no-inline-styles": "off",
        "@typescript-eslint/no-shadow": "off",
        "no-self-compare": "off",
        "react/self-closing-comp": "off",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "indent": ["error", 2],
      },
    },
    {
      files: ["**/*.d.ts"],
      plugins: ["redundant-undefined"],
      rules: {
        "no-dupe-class-members": "off",
        "redundant-undefined/redundant-undefined": ["error", { followExactOptionalPropertyTypes: true }],
      },
    },
  ],
};

module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier", "plugin:react-hooks/recommended", "react-app"],
  rules: {
    "arrow-parens": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
    "jest/globals": true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module",
    ecmaVersion: 2022
  },
  plugins: ["react", "@typescript-eslint", "rxjs", "jest", "prettier", "jsx-a11y", "promise"]
};

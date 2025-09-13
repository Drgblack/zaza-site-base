module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  env: { browser: true, node: true, es2022: true },
  plugins: ["unused-imports"],
  rules: {
    "no-undef": "off", // TS handles globals; avoids CustomEvent/KeyboardEvent false-positives
    "unused-imports/no-unused-imports": "error", // auto-remove unused imports on --fix
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
    "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
  },
};

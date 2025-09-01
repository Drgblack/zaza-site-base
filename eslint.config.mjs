import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "eslint-plugin-next";

export default [
  // Ignore build artifacts
  { ignores: ["**/node_modules/**", ".next/**", "out/**", "dist/**"] },
  // Recommended configs
  ...tseslint.configs.recommended,
  js.configs.recommended,
  next.configs["core-web-vitals"],
  // Project-specific overrides
  {
    rules: {
      // Stop failing builds on apostrophes/quotes inside JSX text
      "react/no-unescaped-entities": "off",
      // Keep unused-vars as a warning (don’t fail build)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
    }
  }
];

import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Ignore build artifacts
  { ignores: ["**/node_modules/**", ".next/**", "out/**", "dist/**"] },
  // Recommended configs
  ...tseslint.configs.recommended,
  js.configs.recommended,
  // Project-specific overrides
  {
    languageOptions: {
      globals: {
        // Node.js globals
        process: "readonly",
        require: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        exports: "readonly",
        // Browser globals
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        Response: "readonly",
        Request: "readonly",
        URL: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLFormElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLSpanElement: "readonly",
        // Browser APIs
        localStorage: "readonly",
        navigator: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URLSearchParams: "readonly",
        // React globals
        React: "readonly",
        JSX: "readonly"
      }
    },
    rules: {
      // Stop failing builds on apostrophes/quotes inside JSX text
      "react/no-unescaped-entities": "off",
      // Keep unused-vars as a warning (don't fail build)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      // Disable specific rules that are too strict for this project
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      // Allow console for debugging and logging
      "no-console": "off",
      // Allow undef for globals
      "no-undef": "warn",
      // Disable problematic Next.js rules that aren't properly configured
      "@next/next/no-html-link-for-pages": "off",
      // Disable non-null assertion warnings for this project
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off"
    }
  }
];

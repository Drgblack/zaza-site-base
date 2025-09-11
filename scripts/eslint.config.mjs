import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module', project: false },
    },
    rules: {
      // keep it strict but focused for this single file
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  reactHooks.configs.recommended,
  jsxA11y.flatConfigs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 17+ / Vite не требует import React
      'react/react-in-jsx-scope': 'off',

      // Часто мешает в TS, потому что типы уже описывают props
      'react/prop-types': 'off',

      // Хорошее style-правило для JSX
      'react/jsx-boolean-value': ['warn', 'never'],

      // Хорошее style-правило для компонентов
      'react/self-closing-comp': 'warn',

      // Для shadcn/ui и composition patterns иногда удобнее не запрещать spread
      'react/jsx-props-no-spreading': 'off',

      // TS-style
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);

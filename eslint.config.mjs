/**
 * @file ESLint Configuration for Code Quality and Formatting.
 *
 * @description Custom configuration for ESLint v9, the JavaScript linter.
 * Defines rules and configurations to maintain quality and consistency
 * in your project's code, along with style rules and best practices.
 * Integrates with Prettier for code formatting.
 *
 * NOTE: ESLint Rule Severity Levels:
 *
 * - (0) => "off"   Rule is disabled.
 * - (1) => "warn"  Rule triggers a warning (does not fail the build).
 * - (2) => "error" Rule triggers an error (fails the build).
 *
 * @see {@link https://eslint.org/docs/latest/use/configure | ESLint Configuration File}
 * @see {@link https://github.com/prettier/eslint-plugin-prettier | ESLint Prettier Plugin}
 *
 * @module EslintConfiguration
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES

// » IMPORT THIRD PARTIES MODULES
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginJSDOC from 'eslint-plugin-jsdoc';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A glob pattern string for ignoring files/directories.
 *
 * @typedef {string} IgnorePattern
 */

/**
 * Array of glob patterns to ignore.
 *
 * @typedef {Array<IgnorePattern>} IgnorePatterns
 */

/**
 * Type for a single ESLint flat configuration object.
 *
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * Type for the full ESLint flat configuration (usually an array).
 *
 * @typedef {import('eslint').Linter.Config[]} ESLintConfigArray
 */

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// » IGNORE PATTERNS
/**
 * Glob pattern that ignore dependencies and package manager files.
 *
 * @type {IgnorePatterns}
 * @constant DEPENDENCIES
 */
const DEPENDENCIES = ['node_modules/**', 'jspm_packages/', '.pnp', '.pnp.js'];

/**
 * Glob pattern that ignore documentation directories.
 *
 * @type {IgnorePatterns}
 * @constant DOCUMENTATION
 */
const DOCUMENTATION = ['docs/**', 'jsdoc/**'];

/**
 * Glob pattern that ignore Build y production directories.
 *
 * @type {IgnorePatterns}
 * @constant BUILD_OUTPUT
 */
const BUILD_OUTPUT = ['build/**', 'dist/**', 'reports/**'];

/**
 * Glob pattern that ignore Build y production directories.
 *
 * @type {IgnorePatterns}
 * @constant TESTING
 */
const TESTING = ['coverage/**', 'tests/bench/**', 'tests/fixtures/**', 'tests/performance/**'];

/**
 * Glob pattern that ignore temporary files.
 *
 * @type {IgnorePatterns}
 * @constant TEMPORARY
 */
const TEMPORARY = ['tmp/**', '**/*.tmp', '**/*.temp'];

/**
 * Glob pattern that ignore playground directory.
 *
 * @type {IgnorePatterns}
 * @constant PLAYGROUND
 */
const PLAYGROUND = [
  'playground/*',
  '!playground/drafts/',
  '!playground/drafts/**',
  '!playground/scripts/',
  '!playground/scripts/**',
  '!playground/workspace/**',
];

/**
 * Glob pattern that ignore development and workspace files and directories.
 *
 * @type {IgnorePatterns}
 * @constant WORKSPACE
 */
const WORKSPACE = ['templates/**', 'notes/**', 'development/**', 'develop[-_.][0-9][0-9].js'];

/**
 * Glob pattern that ignore files.
 *
 * @type {IgnorePatterns}
 * @constant SPECIFIC_FILES
 */
const SPECIFIC_FILES = ['**/serviceWorker.js'];

/**
 * Glob pattern that ignore the React client workspace.
 *
 * @type {IgnorePatterns}
 * @constant CLIENT
 */
const CLIENT = ['client/**'];

/**
 * Combined list of all glob patterns to exclude from linting.
 *
 * Merges categorized ignore patterns (dependencies, build outputs,
 * documentation, tests, temporary files, etc.).
 *
 * @type {IgnorePatterns}
 * @constant IGNORES_FILES
 */
const IGNORE_PATTERNS = [
  ...DEPENDENCIES,
  ...DOCUMENTATION,
  ...BUILD_OUTPUT,
  ...TESTING,
  ...TEMPORARY,
  ...PLAYGROUND,
  ...WORKSPACE,
  ...SPECIFIC_FILES,
  ...CLIENT,
];

/**
 * Global ignore patterns applied to the entire project.
 *
 * Uses ESLint's `globalIgnores()` helper so these patterns affect
 * all configuration blocks.
 *
 * @type {ReturnType<typeof globalIgnores>}
 */
const GLOBAL_IGNORE_PATTERNS = globalIgnores(IGNORE_PATTERNS);

// ━━ ESLINT RULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Base ESLint configuration for the project.
 *
 * This is the core configuration block that establishes foundational
 * JavaScript best practices and code quality rules for all supported
 * file types (JavaScript, TypeScript, and JSX).
 *
 * It extends ESLint's recommended rules and adds custom rules focused on:
 * - Modern JavaScript practices (`no-var`, `prefer-const`).
 * - Code clarity and safety (`no-param-reassign`, `no-shadow`).
 * - Console usage control.
 * - Unused variable handling with common ignore patterns (leading underscore).
 *
 * This configuration serves as the foundation for all other specialized
 * blocks (Prettier, JSDoc, etc.).
 *
 * @type {ESLintConfig}
 * @constant BASE_CONFIGURATION
 */
const BASE_CONFIGURATION = {
  name: 'base',
  files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  extends: [js.configs.recommended],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.node,
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-shadow': 'error',
    'object-shorthand': ['error', 'always'],
    'max-classes-per-file': ['error', 1],
    'no-underscore-dangle': ['off'],
    'no-plusplus': 'error',
  },
};

/**
 * ESLint configuration that validates ECMAScript module imports.
 *
 * Enforces best practices for module imports by detecting unresolved
 * modules, invalid exports, duplicate imports, dependency issues, and
 * consistent import organization.
 *
 * This configuration helps maintain reliable and predictable module
 * resolution while promoting a consistent import structure across the
 * project.
 *
 * @type {ESLintConfig}
 */
const IMPORT_CONFIGURATION = {
  name: 'import',
  files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  plugins: {
    import: fixupPluginRules(eslintPluginImportX),
  },
  settings: {
    'import/resolver': {
      node: true,
      extensions: ['.js', '.mjs', '.cjs'],
    },
    'import/extensions': ['.js', '.mjs', '.cjs'],
  },
  rules: {
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'off',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-commonjs': 'warn',
  },
};

/**
 * ESLint configuration that integrates Prettier.
 *
 * Disables ESLint rules that conflict with Prettier and runs
 * Prettier as an ESLint rule, reporting formatting issues as
 * linting errors.
 *
 * @type {ESLintConfig}
 */
const PRETTIER_CONFIGURATION = {
  name: 'prettier',
  extends: [eslintConfigPrettier],
  plugins: {
    prettier: fixupPluginRules(eslintPluginPrettier),
  },
  rules: {
    'prettier/prettier': 'error',
  },
};

/**
 * ESLint configuration block that enforces comprehensive JSDoc validation.
 *
 * Applies strict documentation standards including:
 *
 * - Required descriptions.
 * - Parameter and return validation.
 * - Type correctness.
 * - Formatting and alignment rules.
 *
 * Targets JavaScript and TypeScript source files.
 *
 * @type {ESLintConfig}
 */
const JSDOC_CONFIGURATION = {
  name: 'jsdoc',
  files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  plugins: {
    jsdoc: fixupPluginRules(eslintPluginJSDOC),
  },
  rules: {
    'jsdoc/check-access': 'warn',
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-examples': [
      'off',
      {
        exampleCodeRegex: '```js\n([\\s\\S]*)```',
      },
    ],
    'jsdoc/check-indentation': 'warn',
    'jsdoc/check-line-alignment': [
      'error',
      'always',
      {
        tags: ['typedef', 'property'],
        customSpacings: { postDelimiter: 1 },
      },
    ],
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-property-names': 'warn',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['hook', 'record', 'component'],
      },
    ],
    'jsdoc/check-types': 'warn',
    'jsdoc/check-values': 'warn',
    'jsdoc/empty-tags': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/match-description': 'warn',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-bad-blocks': 'warn',
    'jsdoc/no-defaults': 'warn',
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': [
      'error',
      {
        definedTypes: [
          'JSX.Element',
          'ReactNode',
          'ReactElement',
          'ReadonlySet',
          'IterableIterator',
          'Generator',
          'AsyncIterator',
          'BufferSource',
          'ArrayBufferView',
          'HTMLSelectElement',
          'HTMLElement',
          'HTMLButtonElement',
          'HTMLInputElement',
          'HTMLTextAreaElement',
          'HTMLUListElement',
          'Element',
          'HTMLDialogElement',
          'HTMLTemplateElement',
        ],
      },
    ],
    'jsdoc/require-asterisk-prefix': 'warn',
    'jsdoc/require-description': 'warn',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-example': [
      'error',
      {
        exemptedBy: ['private', 'inheritdoc', 'abstract', 'internal'],
        contexts: [
          'MethodDefinition[kind="method"][key.type="Identifier"]',
          'MethodDefinition[kind="constructor"]',
          'ArrowFunctionExpression',
          'FunctionDeclaration',
        ],
      },
    ],
    'jsdoc/require-file-overview': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-jsdoc': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-property': 'warn',
    'jsdoc/require-property-description': 'warn',
    'jsdoc/require-property-name': 'warn',
    'jsdoc/require-property-type': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/require-throws': 'warn',
    'jsdoc/require-yields': 'warn',
    'jsdoc/require-yields-check': 'warn',
    'jsdoc/valid-types': 'warn',
  },
};

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The Eslint settings for the project.
 *
 * @constant eslintConfiguration
 * @type {ESLintConfigArray}
 */
const eslintConfiguration = defineConfig([
  GLOBAL_IGNORE_PATTERNS,
  BASE_CONFIGURATION,
  IMPORT_CONFIGURATION,
  JSDOC_CONFIGURATION,
  PRETTIER_CONFIGURATION,
]);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default eslintConfiguration;

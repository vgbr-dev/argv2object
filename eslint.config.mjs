/**
 * @file ESLint Configuration for Code Quality and Formatting.
 *
 * @description Custom configuration for ESLint v9, the JavaScript/TypeScript
 * linter. Defines rules and configurations to maintain quality and consistency
 * in your project's code, along with style rules and best practices.
 * Integrates with Prettier for code formatting and Airbnb style guide as base.
 *
 * @see {@link https://eslint.org/docs/latest/use/configure | ESLint Configuration File}
 * @see {@link https://github.com/airbnb/javascript | Airbnb JavaScript Style Guide}
 * @see {@link https://github.com/prettier/eslint-plugin-prettier | ESLint Prettier Plugin}
 *
 * @module EslintConfiguration
 */
// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
import path from 'path';
import { fileURLToPath } from 'url';

// » IMPORT THIRD PARTIES MODULES
import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import { fixupPluginRules } from '@eslint/compat';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginJSDOC from 'eslint-plugin-jsdoc';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Array with glob pattern.
 *
 * @typedef {Array<string>} BlobPatterns
 */

/**
 * Type for Eslint configuration.
 *
 * @typedef  {object}   EslintConfigurationOption
 * @property {string}   name                      - Unique identifier for this configuration.
 * @property {string[]} files                     - File patterns to apply this configuration to.
 * @property {string[]} ignores                   - Patterns to exclude from linting.
 * @property {object[]} extends                   - Base configurations to extend.
 * @property {object}   plugins                   - ESLint plugins with their rules.
 * @property {object}   languageOptions           - Language parsing options.
 * @property {object}   rules                     - Custom rule configurations.
 */

/**
 * Type for Eslint configurations.
 *
 * @typedef {Array<EslintConfigurationOptions>} EslintConfigurationOptions
 */

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The full filename of the current module (converted from file URL).
 *
 * @constant {string} __filename
 */
const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle

/**
 * The directory name containing the current module.
 *
 * @constant {string} __filename
 */
const __dirname = path.dirname(__filename); // eslint-disable-line no-underscore-dangle

/**
 * Compatibility layer for ESLint Flat Config.
 * Enables using legacy ESLint config files with the new flat config system.
 *
 * @constant compat
 * @type {FlatCompat}
 * @see {@link https://www.npmjs.com/package/@eslint/eslintrc | @eslint/eslintrc}
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Airbnb base JavaScript style guide configuration.
 * Provides a sensible set of default rules for JavaScript projects.
 *
 * @constant {object} eslintConfigAirbnbBase
 * @see {@link https://www.npmjs.com/package/eslint-config-airbnb-base | eslint-config-airbnb-base}
 */
const eslintConfigAirbnbBase = compat.extends('eslint-config-airbnb-base');

// ━━ IGNORE PATTERNS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Glob pattern for ignore dependencies and packages files.
 *
 * @constant {BlobPatterns} DEPENDENCIES
 */
const DEPENDENCIES = ['node_modules/', 'jspm_packages/', '.pnp', '.pnp.js'];

/**
 * Glob pattern for ignore documentation directories.
 *
 * @constant {BlobPatterns} DOCUMENTATION
 */
const DOCUMENTATION = ['/docs/**', '/jsdoc/**'];

/**
 * Glob pattern for ignore Build y production directories.
 *
 * @constant {BlobPatterns} BUILD_OUTPUT
 */
const BUILD_OUTPUT = ['/build/**', '/dist/**', 'reports/'];

/**
 * Glob pattern for ignore Build y production directories.
 *
 * @constant {BlobPatterns} TESTING
 */
const TESTING = ['/coverage/**', '/tests/bench/**', '/tests/fixtures/**', '/tests/performance/**'];

/**
 * Glob pattern for ignore temporary files.
 *
 * @constant {BlobPatterns} TEMPORARY
 */
const TEMPORARY = ['/tmp/**', '*.tmp', '*.temp'];

/**
 * Glob pattern for ignore development and workspace files and directories.
 *
 * @constant {BlobPatterns} WORKSPACE
 */
const WORKSPACE = [
  '/templates/**',
  '/notes/**',
  '/development/**',
  '/develop.js',
  '/develop[-_.][0-9][0-9].js',
];

/**
 * Glob pattern for ignore files.
 *
 * @constant {BlobPatterns} SPECIFIC_FILES
 */
const SPECIFIC_FILES = [
  '**/serviceWorker.js',
  '!.eslintrc', // Excepción: NO ignorar el archivo .eslintrc
];

const IGNORES_FILES = [
  ...DEPENDENCIES,
  ...DOCUMENTATION,
  ...BUILD_OUTPUT,
  ...TESTING,
  ...TEMPORARY,
  ...WORKSPACE,
  ...SPECIFIC_FILES,
];

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The Eslint settings for the project.
 *
 * @constant eslintConfiguration
 * @type {EslintConfigurationOptions}
 */
const eslintConfiguration = defineConfig([
  {
    name: 'eslint/main',
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    ignores: IGNORES_FILES,
    extends: [eslintConfigAirbnbBase, eslintConfigPrettier],
    plugins: {
      prettier: fixupPluginRules(eslintPluginPrettier),
      jsdoc: fixupPluginRules(eslintPluginJSDOC),
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.jsx', '.tsx'],
          paths: ['.'],
        },
        alias: true,
      },
    },
    rules: {
      // » GENERAL RULES
      strict: [2, 'global'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-param-reassign': ['error', { props: false }],
      // » PRETTIER RULES
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          arrowParens: 'avoid',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['eslint.config.mjs'],
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          commonjs: true,
          amd: true,
          caseSensitive: true,
          ignore: ['^#'], // Ignora los imports que comienzan con #
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
          cjs: 'always',
          ts: 'always',
          jsx: 'always',
          tsx: 'always',
        },
      ],
      // » JSDOC rules
      'jsdoc/check-access': 1,
      'jsdoc/check-alignment': 1,
      'jsdoc/check-examples': [
        0,
        {
          exampleCodeRegex: '```js\n([\\s\\S]*)```',
        },
      ],
      'jsdoc/check-indentation': 1,
      'jsdoc/check-line-alignment': [
        'error',
        'always',
        {
          tags: ['typedef', 'property'],
          customSpacings: { postDelimiter: 1 },
        },
      ],
      'jsdoc/check-param-names': 1,
      'jsdoc/check-property-names': 1,
      'jsdoc/check-syntax': 1,
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: ['hook', 'record'],
        },
      ],
      'jsdoc/check-types': 1,
      'jsdoc/check-values': 1,
      'jsdoc/empty-tags': 1,
      'jsdoc/implements-on-classes': 1,
      'jsdoc/match-description': 1,
      'jsdoc/newline-after-description': 'off',
      'jsdoc/no-bad-blocks': 1,
      'jsdoc/no-defaults': 1,
      'jsdoc/no-types': 0,
      'jsdoc/no-undefined-types': 1,
      'jsdoc/require-asterisk-prefix': 1,
      'jsdoc/require-description': 1,
      'jsdoc/require-description-complete-sentence': 1,
      'jsdoc/require-example': 1,
      'jsdoc/require-file-overview': 1,
      'jsdoc/require-hyphen-before-param-description': 1,
      'jsdoc/require-jsdoc': 1,
      'jsdoc/require-param': 1,
      'jsdoc/require-param-description': 1,
      'jsdoc/require-param-name': 1,
      'jsdoc/require-param-type': 1,
      'jsdoc/require-property': 1,
      'jsdoc/require-property-description': 1,
      'jsdoc/require-property-name': 1,
      'jsdoc/require-property-type': 1,
      'jsdoc/require-returns': 1,
      'jsdoc/require-returns-check': 1,
      'jsdoc/require-returns-description': 1,
      'jsdoc/require-returns-type': 1,
      'jsdoc/require-throws': 1,
      'jsdoc/require-yields': 1,
      'jsdoc/require-yields-check': 1,
      'jsdoc/valid-types': 1,
    },
  },
]);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default eslintConfiguration;

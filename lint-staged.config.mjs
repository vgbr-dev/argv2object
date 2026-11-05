/**
 * @file Lint-Staged Configuration for Pre-Commit Validation.
 *
 * @description Custom settings for lint-staged, used to validate staged files
 * before commit. Defines file pattern matching and validation commands for
 * formatting, linting, and code quality checks.
 *
 * @see {@link https://github.com/lint-staged/lint-staged | lint-staged Documentation}
 *
 * @version 1.0.0
 * @module LintStagedConfiguration
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Type for lint-staged configuration.
 *
 * @typedef {import('lint-staged').Config} LintStagedConfigurationOption
 */

/**
 * Array with glob pattern.
 *
 * @typedef {Array<string>} GlobPatterns
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Default glob pattern for JavaScript files.
 *
 * @constant {GlobPatterns} JS_FILES
 */
const JS_FILES = '*.{js,jsx,mjs,cjs,ts,tsx}';

/**
 * Default glob pattern for style files.
 *
 * @constant {GlobPatterns} STYLE_FILES
 */
const STYLE_FILES = '*.{css,scss,sass,less}';

/**
 * Default glob pattern for markup files.
 *
 * @constant {GlobPatterns} MARKUP_FILES
 */
const MARKUP_FILES = '*.{html,htm}';

/**
 * Default glob pattern for JSON files.
 *
 * @constant {GlobPatterns} JSON_FILES
 */
const JSON_FILES = '*.json';

// ━━ CONFIGURATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The lint-staged configuration object.
 *
 * @constant lintStagedConfig
 * @type {LintStagedConfigurationOption}
 */
const lintStagedConfig = {
  // Verificación básica de formato (sin --write)
  '*': 'prettier --check --ignore-unknown',

  // JavaScript: Solo ESLint en modo verificación
  [JS_FILES]: filenames => [
    `eslint --max-warnings=0 ${filenames.join(' ')}`, // --max-warnings=0 falla si hay warnings
    `prettier --check ${filenames.join(' ')}`,
  ],

  // CSS: Solo Stylelint en modo verificación
  [STYLE_FILES]: filenames => [
    `stylelint ${filenames.join(' ')}`, // Sin --fix
    `prettier --check ${filenames.join(' ')}`,
  ],

  // HTML y JSON: Solo verificación de formato
  [MARKUP_FILES]: 'prettier --check',
  [JSON_FILES]: 'prettier --check',
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default lintStagedConfig;

/**
 * @file The lint-staged Configuration for Git Hooks.
 *
 * @description Configuration for lint-staged, a tool that runs linters on git
 * staged files. Define commands to automatically format and validate code
 * before commits, ensuring consistent code quality across the project.
 *
 * @see {@link https://github.com/lint-staged/lint-staged | lint-staged Documentation}
 * @module LintStagedConfiguration
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Type for Prettier configuration.
 *
 * @typedef {import('lint-staged').Configuration} LintStagedConfigurationOptions
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Run tasks concurrently for better performance.
 *
 * @constant CONCURRENT
 */
const CONCURRENT = true;

/**
 * Enable verbose output for debugging purposes.
 *
 * @constant VERBOSE
 */
const VERBOSE = true;

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Prettier settings for the project.
 *
 * @constant lintStagedConfiguration
 * @type {LintStagedConfigurationOptions}
 */
const lintStagedConfiguration = {
  concurrent: CONCURRENT,
  verbose: VERBOSE,
  rules: {
    // JavaScript/TypeScript files
    '**/*.{js,mjs,cjs,ts,tsx}': ['eslint', 'prettier'],

    // JSON and configuration files
    '**/*.{json,md,yml,yaml}': ['prettier'],

    // Style files (CSS, SCSS, etc.)
    '**/*.{css,scss,sass,less}': ['stylelint', 'prettier'],

    // HTML and template files
    '**/*.html': ['prettier'],
  },
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default lintStagedConfiguration;

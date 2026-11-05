/**
 * @file Prettier Configuration for Code Formatting.
 *
 * @description Custom settings for Prettier, the code formatter. Define
 * formatting rules to maintain consistency in your project's code, including
 * quoting, semicolons, indentation, and line length.
 *
 * @see {@link https://prettier.io/docs/configuration | Prettier Configuration File}
 *
 *
 * @version 1.0.0
 * @module PrettierConfiguration
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Type for Prettier configuration.
 *
 * @typedef {import("prettier").Config} PrettierConfiguration
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Prettier settings for the project.
 *
 * @constant prettierConfiguration
 * @type {PrettierConfiguration}
 */
const prettierConfiguration = {
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default prettierConfiguration;

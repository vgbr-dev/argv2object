/**
 * @file Prettier Configuration for Code Formatting.
 *
 * @description Custom settings for Prettier, the code formatter. Define
 * formatting rules to maintain consistency in your project's code, including
 * quoting, semicolons, indentation, and line length.
 *
 * @see {@link https://prettier.io/docs/configuration | Prettier Configuration File}
 * @module PrettierConfiguration
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Type for Prettier configuration.
 *
 * @typedef {import("prettier").Config} PrettierConfigurationOptions
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Prettier settings for the project.
 *
 * @constant prettierConfiguration
 * @type {PrettierConfigurationOptions}
 */
const prettierConfiguration = {
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['.prettierrc', '.babelrc', '.eslintrc', '.stylelintrc'],
      options: {
        parser: 'json',
      },
    },
  ],
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default prettierConfiguration;

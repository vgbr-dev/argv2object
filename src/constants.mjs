/**
 * @file Module containing constants for argument validation.
 *
 * This module exports regular expressions for argument pattern matching
 * and standardized error messages used throughout the argv2object library.
 * These constants ensure consistent validation and error reporting when
 * parsing command-line arguments.
 *
 * @module constants
 * @since 1.0.0
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expression patterns for argument validation.
 *
 * @typedef  {object} Regexps
 * @property {RegExp} UNIXMODE - Pattern for Unix-style arguments (-a, --arg=value).
 * @property {RegExp} SIMPLE   - Pattern for simple key=value arguments.
 */

/**
 * Standardized error messages for argument validation failures.
 *
 * @typedef  {object} ErrorMessages
 * @property {string} INVALID_UNIXMODE_TYPE - When unixmode parameter is not boolean.
 * @property {string} NO_ARGUMENTS          - When no arguments are provided.
 * @property {string} NO_MATCH_SIMPLE       - When simple args don't match key=value format.
 * @property {string} NO_MATCH_UNIXMODE     - When args don't match Unix-style format.
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expressions for validating different argument formats.
 *
 * @exports
 * @private
 * @constant REGEXPS
 * @type {Regexps}
 * @example
 * ```js
 * // Unix-style pattern matches:
 * // -a, -b=value, --flag, --option=value
 * REGEXPS.UNIXMODE.test('--output=json') // true
 * ```
 *
 * @example
 * ```js
 * // Simple pattern matches:
 * // key=value, multi-part-key=value
 * REGEXPS.SIMPLE.test('output_format=json') // true
 * ```
 */
const REGEXPS = {
  UNIXMODE: /^-[a-z]{1}|-[a-z]{1}=.*$|--[a-zA-Z]+|--[a-zA-Z]+(?:-[a-zA-Z]+)*=.*$/,
  SIMPLE: /^[a-zA-Z]+(?:-[a-zA-Z]+)*=.*$/,
};

/**
 * Standardized error messages for consistent validation feedback.
 *
 * @exports
 * @private
 * @constant THROWS_ERRORS_MESSAGES
 * @type {ErrorMessages}
 * @example
 * ```js
 * // Error cases:
 * throw new Error(ERROR_MESSAGES.INVALID_UNIXMODE_TYPE);
 * throw new Error(ERROR_MESSAGES.NO_ARGUMENTS);
 * ```
 */
const THROWS_ERRORS_MESSAGES = {
  INVALID_UNIXMODE_TYPE: 'The "unixmode" parameter must be a boolean value',
  NO_ARGUMENTS: 'No command-line arguments were provided',
  NO_MATCH_SIMPLE: 'Arguments must follow "key=value" format',
  NO_MATCH_UNIXMODE: 'Arguments must follow Unix-style format (-a, --option=value)',
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Exported constants for argument validation.
 *
 * @type {object}
 * @property {Regexps}       REGEXPS                - Validation patterns.
 * @property {ErrorMessages} THROWS_ERRORS_MESSAGES - Standard error messages.
 */
export { REGEXPS, THROWS_ERRORS_MESSAGES };

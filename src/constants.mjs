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
 * Patterns for Unix-style command line arguments.
 *
 * @typedef  {object} UNIXPatterns
 * @property {RegExp} SHORT        - Matches short Unix flags: `-a`, `-v`, `-f=value`.
 * @property {RegExp} LONG         - Matches long Unix flags: `--help`, `--output=json`.
 */

/**
 * Type definition for command line argument patterns.
 *
 * @typedef  {object} CommandLinePatterns
 * @property {RegExp} UNIX_SHORT          - Matches short Unix flags: `-a`, `-v`, `-f=value`.
 * @property {RegExp} UNIX_LONG           - Matches long Unix flags: `--help`, `--output=json`.
 * @property {RegExp} SIMPLE              - Pattern for simple key=value arguments: key=value, multi-part-key=value.
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
 * Regular expression patterns for validating command line argument formats.
 *
 * Provides comprehensive pattern matching for different command line argument
 * styles commonly used in Node.js applications and CLI tools.
 *
 * @exports
 * @private
 * @constant COMMAND_LINE_PATTERNS
 * @type {CommandLinePatterns}
 *
 * @example
 * ```js
 * // Valid short flags:
 * COMMAND_LINE_PATTERNS.UNIX_SHORT.test('-h')    // true
 * COMMAND_LINE_PATTERNS.UNIX_SHORT.test('-v')    // true
 * COMMAND_LINE_PATTERNS.UNIX_SHORT.test('-f=json') // true
 *
 * // Invalid short flags:
 * COMMAND_LINE_PATTERNS.UNIX_SHORT.test('--help') // false
 * COMMAND_LINE_PATTERNS.UNIX_SHORT.test('-abc')   // false
 * ```
 *
 * @example
 * ```js
 * // Valid long flags:
 * COMMAND_LINE_PATTERNS.UNIX_LONG.test('--help')        // true
 * COMMAND_LINE_PATTERNS.UNIX_LONG.test('--output=json') // true
 * COMMAND_LINE_PATTERNS.UNIX_LONG.test('--dry-run')     // true
 *
 * // Invalid long flags:
 * COMMAND_LINE_PATTERNS.UNIX_LONG.test('-h')           // false
 * COMMAND_LINE_PATTERNS.UNIX_LONG.test('--123')        // false
 * ```
 *
 * @example
 * ```js
 * // Valid simple arguments:
 * COMMAND_LINE_PATTERNS.SIMPLE.test('output=json')          // true
 * COMMAND_LINE_PATTERNS.SIMPLE.test('config-file=settings') // true
 *
 * // Invalid simple arguments:
 * COMMAND_LINE_PATTERNS.SIMPLE.test('--output=json')        // false
 * COMMAND_LINE_PATTERNS.SIMPLE.test('output')               // false
 * ```
 */
const COMMAND_LINE_PATTERNS = {
  UNIXMODE: {
    SHORT: /^-[a-zA-Z](=.*)?$/,
    LONG: /^--[a-zA-Z][a-zA-Z0-9-]*(=.*)?$/,
  },
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
const ERROR_MESSAGES = {
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
 * @property {CommandLinePatterns} REGEXPS                - Validation patterns.
 * @property {ErrorMessages}       THROWS_ERRORS_MESSAGES - Standard error messages.
 */
export { COMMAND_LINE_PATTERNS, ERROR_MESSAGES };

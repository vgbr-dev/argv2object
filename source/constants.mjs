// @ts-check
/**
 * @file Defines argument patterns and validation messages.
 *
 * @description Centralizes the syntax accepted by each argument format and the
 * messages used when public input validation fails.
 *
 * @module constants
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expressions used to validate command-line arguments.
 *
 * @typedef  {object} CommandLinePatterns
 * @property {RegExp} UNIX_SHORT          - Matches short Unix options such as `-a` and `-f=value`.
 * @property {RegExp} UNIX_LONG           - Matches long Unix options such as `--help` and `--output=json`.
 * @property {RegExp} SIMPLE              - Matches `key=value` arguments with letters, digits, and hyphens.
 */

/**
 * Error messages used by the argument parser.
 *
 * @typedef  {object} ErrorMessages
 * @property {string} INVALID_UNIXMODE_TYPE - The Unix mode argument is not boolean.
 * @property {string} NO_ARGUMENTS          - No command-line arguments were provided.
 * @property {string} NO_MATCH_SIMPLE       - An argument does not match the simple format.
 * @property {string} NO_MATCH_UNIXMODE     - An argument does not match the Unix format.
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expressions used to validate command-line arguments.
 *
 * @type {Readonly<CommandLinePatterns>}
 */
const COMMAND_LINE_PATTERNS = Object.freeze({
  UNIX_SHORT: /^-[a-zA-Z](=.*)?$/,
  UNIX_LONG: /^--[a-zA-Z][a-zA-Z0-9-]*(=.*)?$/,
  SIMPLE: /^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*=.*$/,
});

/**
 * Error messages used by the argument parser.
 *
 * @type {Readonly<ErrorMessages>}
 */
const ERROR_MESSAGES = Object.freeze({
  INVALID_UNIXMODE_TYPE: 'The "unixmode" parameter must be a boolean value',
  NO_ARGUMENTS: 'No command-line arguments were provided',
  NO_MATCH_SIMPLE: 'Arguments must follow "key=value" format',
  NO_MATCH_UNIXMODE: 'Arguments must follow Unix-style format (-a, --option=value)',
});

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { COMMAND_LINE_PATTERNS, ERROR_MESSAGES };

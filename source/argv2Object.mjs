// @ts-check
/**
 * @file Converts command-line arguments into a key-value object.
 *
 * @description Parses arguments from `process.argv` as simple `key=value`
 * pairs or Unix-style options.
 *
 * @module argv2Object
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
import { COMMAND_LINE_PATTERNS, ERROR_MESSAGES } from '#constants';
import { createObjectFromArguments } from '#functions';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Value produced by converting a raw command-line argument.
 *
 * @typedef {string|number|boolean} ArgumentValue
 */

/**
 * Parsed command-line arguments keyed by their normalized names.
 *
 * @typedef {Record<string, ArgumentValue>} ArgvObject
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Converts command-line arguments into an object.
 *
 * Simple mode accepts `key=value` arguments. Unix mode accepts short options
 * such as `-v` and long options such as `--verbose` or `--output=json`.
 * Argument values are converted to booleans or finite decimal numbers when
 * their complete string representation matches the supported format.
 *
 * @param {boolean} [unixmode] - Whether to parse Unix-style options. Defaults to `false`.
 * @returns {ArgvObject} The object created from the command-line arguments.
 * @throws {TypeError} If `unixmode` is not a boolean.
 * @throws {Error} If no arguments are provided or an argument has an invalid format.
 *
 * @example
 * ```js
 * // Command: node script.mjs name=John age=30
 * const argumentsv = argv2Object();
 * console.log(argumentsv.name); // 'John'
 * console.log(argumentsv.age); // 30
 * ```
 *
 * @example
 * ```js
 * // Command: node script.mjs --name=John --verbose
 * const argumentsv = argv2Object(true);
 * console.log(argumentsv.name); // 'John'
 * console.log(argumentsv.verbose); // true
 * ```
 */
const argv2Object = (unixmode = false) => {
  if (typeof unixmode !== 'boolean') {
    throw new TypeError(ERROR_MESSAGES.INVALID_UNIXMODE_TYPE);
  }

  const argumentsv = process.argv.slice(2);

  if (argumentsv.length === 0) {
    throw new Error(ERROR_MESSAGES.NO_ARGUMENTS);
  }

  const patterns = unixmode
    ? [COMMAND_LINE_PATTERNS.UNIX_LONG, COMMAND_LINE_PATTERNS.UNIX_SHORT]
    : [COMMAND_LINE_PATTERNS.SIMPLE];

  const isValid = argumentsv.every(argument => patterns.some(pattern => pattern.test(argument)));

  if (!isValid) {
    const message = unixmode ? ERROR_MESSAGES.NO_MATCH_UNIXMODE : ERROR_MESSAGES.NO_MATCH_SIMPLE;
    throw new Error(message);
  }

  return createObjectFromArguments(argumentsv, 'snakecase');
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default argv2Object;

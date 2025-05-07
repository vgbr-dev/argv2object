/**
 * @file Converts command-line arguments to a key-value object.
 *
 * A utility function for converting command-line arguments to a key-value
 * object.
 *
 * This file defines a single function, `argv2Object`, which parses
 * command-line arguments and returns an object with keys and values
 * corresponding to the provided arguments. The function can handle two types of
 * arguments: simple key-value pairs (e.g. "key=value") and Unix-style
 * command-line arguments (e.g. "-k value" or "--key=value").
 *
 * @version 1.1.0
 *
 * @example
 *  Simple key-value pairs
 *  Command line input: node script.js name=John age=30 level=admin
 *  Output: { name: 'John', age: '30', level: "admin" }
 *
 * @example
 * Unix-style command-line options
 * Command line input: node script.js -h --name=John --is-admin
 * Output: { h: true, name: 'John', is_admin: true }
 */
// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
import { REGEXPS, THROWS_ERRORS_MESSAGES } from '#constants';
import { formatKey, convertValue } from '#functions';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * An `Object` with keys and values corresponding to the provided arguments.
 *
 * @typedef  {object}         ArgvObject
 * @property {string|boolean} [key=value] - The key-value pairs in the provided arguments.
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `argv2Object()` function, converts command-line arguments to a key-value
 * object.
 *
 * This function takes an array of command-line arguments and converts them to a
 * JavaScript object with keys and values based on the provided argument format.
 * The format can be either simple key-value pairs (e.g. "key=value") or
 * Unix-style command-line options (e.g. "-o --option=value").
 *
 * @function
 * @param {boolean} [unixmode=false] - Whether to parse Unix-style command-line options, the default value is `false`.
 * @returns {ArgvObject} Returns an object with keys and values corresponding to the provided arguments.
 * @throws {TypeError} If `unixmode` is not is not of type `boolean`.
 * @throws {Error} If no arguments are provided from command line.
 * @throws {Error} If `unixmode` is `true` and argument does not follow Unix-style command-line format.
 * @throws {Error} If `unixmode` is `false` and argument does not follow 'key=value' format.
 * @example
 * ```js
 * // Command line input: node script.js --task=some-task --execute=true
 *
 * const args = argv2Object();
 * console.log(args.task); // prints 'some-task'
 * console.log(args.execute); // prints 'true'
 * ```
 */
const argv2Object = (unixmode = false) => {
  if (typeof unixmode !== 'boolean') {
    throw new TypeError(THROWS_ERRORS_MESSAGES.INVALID_UNIXMODE_TYPE);
  }

  const argumentsv = process.argv.slice(2);
  if (argumentsv.length === 0) {
    throw new Error(THROWS_ERRORS_MESSAGES.NO_ARGUMENTS);
  }

  const regexp = unixmode ? REGEXPS.UNIXMODE : REGEXPS.SIMPLE;

  if (!argumentsv.every(argumentv => regexp.test(argumentv))) {
    const message = unixmode
      ? THROWS_ERRORS_MESSAGES.NO_MATCH_UNIXMODE
      : THROWS_ERRORS_MESSAGES.NO_MATCH_SIMPLE;
    throw new Error(message);
  }

  const entries = [...argumentsv].map(argumentv => {
    const [k, v] = argumentv.split('=');
    const key = formatKey(k, 'snakecase');
    const value = convertValue(v);
    return [key, value];
  });

  return Object.fromEntries(entries);
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default argv2Object;

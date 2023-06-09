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
 * @author Victor Giovanni Beltrán Rodríguez
 * @version 1.0.0
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

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expressions used to validate command-line arguments.
 *
 * @private
 * @typedef  {object} Regexps
 * @property {RegExp} UNIXMODE - Regular expression for validating Unix-style command-line arguments.
 * @property {RegExp} SIMPLE   - Regular expression for validating simple key-value arguments.
 */

/**
 * Error messages used in case of invalid command-line arguments.
 *
 * @private
 * @typedef  {object} Errors
 * @property {string} NO_ARGS           - Error message for when no arguments are provided.
 * @property {string} NO_MATCH_SIMPLE   - Error message for when one or more simple key-value arguments do not follow the expected format.
 * @property {string} NO_MATCH_UNIXMODE - Error message for when one or more Unix-style command-line arguments do not follow the expected format.
 */

/**
 * An `Object` with keys and values corresponding to the provided arguments.
 *
 * @typedef  {object}         ArgvObject
 * @property {string|boolean} [key=value] - The key-value pairs in the provided arguments.
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expressions used to validate command-line arguments.
 *
 * @private
 * @type {Regexps}
 */
const REGEXPS = {
  UNIXMODE: /^-[a-z]{1}|-[a-z]{1}=.*$|--[a-zA-Z]+|--[a-zA-Z]+(?:-[a-zA-Z]+)*=.*$/,
  SIMPLE: /^[a-zA-Z]+(?:-[a-zA-Z]+)*=.*$/,
};

/**
 * Error messages used in case of invalid command-line arguments.
 *
 * @private
 * @type {Errors}
 */
const ERRORS = {
  NO_ARGS: 'No arguments added',
  NO_MATCH_SIMPLE: `Some argument(s) do not follow the 'key=value' format.`,
  NO_MATCH_UNIXMODE: `Some argument(s) do not follow the Unix-style command-line format.`,
};

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
  const regexp = unixmode ? REGEXPS.UNIXMODE : REGEXPS.SIMPLE;

  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error(ERRORS.NO_ARGS);
  }

  if (!args.every(arg => regexp.test(arg))) {
    throw new Error(unixmode ? ERRORS.NO_MATCH_UNIXMODE : ERRORS.NO_MATCH_SIMPLE);
  }

  return [...args]
    .map(arg => {
      const [k, v] = arg.split('=');
      const key = k.replace(/^-{1,2}/, '').replace(/-/g, '_');
      const value = v === undefined ? true : v;
      return [key, value];
    })
    .reduce((acc, arg) => {
      const [key, value] = arg;
      acc[key] = value;
      return acc;
    }, {});
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = argv2Object;

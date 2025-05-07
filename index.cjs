/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manages main entry point.
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `argv2Object()` function, converts command-line arguments to a key-value
 * object.
 *
 * This function takes an array of command-line arguments and converts them to a
 * JavaScript object with keys and values based on the provided argument format.
 * The format can be either simple key-value pairs (e.g. "key=value") or
 * Unix-style command-line options (e.g. "-o --option=value").
 *
 * @version 1.0.0
 * @author Victor Giovanni Beltrán Rodríguez
 * @module argv2Object
 */
const argv2Object = require('#argv2Object');

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = argv2Object.default;

// @ts-check
/**
 * @file Provides internal argument formatting and conversion functions.
 *
 * @description Normalizes argument keys, converts supported primitive values,
 * and builds the object returned by the public parser.
 *
 * @module functions
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Supported key formatting modes.
 *
 * @typedef {'camelcase'|'snakecase'} CaseMode
 */

/**
 * Supported values produced by command-line argument parsing.
 *
 * @typedef {string|number|boolean} ArgumentValue
 */

/**
 * Object containing parsed command-line arguments.
 *
 * @typedef {Record<string, ArgumentValue>} ArgvObject
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Matches finite decimal numbers, including signed, fractional, and
 * scientific notation. Rejects hexadecimal, binary, and numeric separators.
 *
 * @type {RegExp}
 */
const NUMERIC_VALUE_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

// ━━ FUNCTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Removes option prefixes and applies the requested key casing.
 *
 * @private
 * @param {string} key - The raw argument key.
 * @param {CaseMode} [mode] - The target casing convention.
 * @returns {string} The normalized key.
 * @throws {TypeError} If the key or casing mode is invalid.
 */
const formatKey = (key, mode) => {
  if (typeof key !== 'string') {
    throw new TypeError('Key must be a string');
  }

  if (mode !== undefined && mode !== 'camelcase' && mode !== 'snakecase') {
    throw new TypeError('Key mode must be "camelcase" or "snakecase"');
  }

  const normalizedKey = key.replace(/^-{1,2}/, '');

  if (mode === 'camelcase') {
    return normalizedKey.replace(/-([a-z])/gi, (_, character) => character.toUpperCase());
  }

  if (mode === 'snakecase') {
    return normalizedKey.replace(/-/g, '_');
  }

  return normalizedKey;
};

/**
 * Converts boolean and finite decimal strings while preserving other text.
 *
 * @private
 * @param {string|undefined} value - The raw argument value.
 * @returns {ArgumentValue} The converted value.
 */
const convertValue = value => {
  if (value === undefined || value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value !== undefined && NUMERIC_VALUE_PATTERN.test(value) && Number.isFinite(Number(value))) {
    return Number(value);
  }

  return value ?? '';
};

/**
 * Parses one argument into its normalized key and converted value.
 *
 * @private
 * @param {string} argument - The argument to parse.
 * @param {CaseMode} mode - The target key casing convention.
 * @returns {[string, ArgumentValue]} The normalized key and converted value.
 */
const parseArgument = (argument, mode) => {
  const separatorIndex = argument.indexOf('=');
  const rawKey = separatorIndex === -1 ? argument : argument.slice(0, separatorIndex);
  const rawValue = separatorIndex === -1 ? undefined : argument.slice(separatorIndex + 1);

  return [formatKey(rawKey, mode), convertValue(rawValue)];
};

/**
 * Builds an object from validated command-line arguments.
 *
 * Repeated keys use the last supplied value. Values are split at the first `=`;
 * additional separators remain part of the value.
 *
 * @private
 * @param {string[]} argumentsv - The validated arguments to process.
 * @param {CaseMode} mode - The target key casing convention.
 * @returns {ArgvObject} The parsed argument object.
 */
const createObjectFromArguments = (argumentsv, mode) => {
  return Object.fromEntries(argumentsv.map(argument => parseArgument(argument, mode)));
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { formatKey, convertValue, createObjectFromArguments };

/**
 * @file TODO ADD SHORT MODULE DESCRIPTION.
 *
 * @module Functions
 */

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Normalizes and formats argument keys according to specified casing convention.
 *
 * Removes leading dashes from command-line flags and applies optional case conversion.
 *
 * Supports:
 *
 * - camelCase conversion (--some-flag → someFlag)
 * - snake_case conversion (--some-flag → some_flag)
 * - No conversion (--some-flag → some-flag)
 *
 * @exports
 * @private
 * @function formatKey
 * @param {string} key - The raw key from command-line arguments
 * @param {'camelcase'|'snakecase'} [mode] - Target formatting mode
 * @returns {string} Normalized and formatted key
 * @throws {TypeError} If key is not a string
 * @example
 * formatKey('--output-format', 'camelcase') // returns 'outputFormat'
 * formatKey('-v', 'snakecase') // returns 'v' (no underscores needed)
 * formatKey('--enable-logging') // returns 'enable-logging'
 */
const formatKey = (key, mode) => {
  if (typeof key !== 'string') {
    throw new TypeError('Key must be a string');
  }
  const sanitizedKey = key.replace(/^-{1,2}/, '');

  if (mode === 'camelcase') {
    return sanitizedKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }

  if (mode === 'snakecase') {
    return sanitizedKey.replace(/-/g, '_');
  }

  return sanitizedKey;
};

/**
 * Converts string values from command-line arguments to proper JavaScript types.
 *
 * Performs automatic conversion of:
 *
 * - 'true'/'false' strings → boolean
 * - Numeric strings → number
 * - undefined values → true (for flag arguments)
 * - All other values remain as strings
 *
 * @exports
 * @private
 * @function convertValue
 * @param {string} [value] - The value to convert
 * @returns {string|boolean|number} Converted value
 * @example
 * convertValue('true') // returns true
 * convertValue('42') // returns 42
 * convertValue() // returns true (for flag arguments)
 * convertValue('text') // returns 'text'
 */
const convertValue = value => {
  if (value === undefined) return true;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!Number.isNaN(value) && !Number.isNaN(parseFloat(value))) return Number(value);
  return value;
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Utility functions for argument processing.
 *
 * @namespace
 * @property {Function} formatKey    - Key formatting/normalization function.
 * @property {Function} convertValue - Value type conversion function.
 */
export { formatKey, convertValue };

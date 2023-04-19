/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file This file contains the test for the `argv2Object` function.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
const { describe, it, afterEach, beforeEach } = require('node:test');
const assert = require('node:assert');

// » IMPORT MODULES
const argv2Object = require('..');

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * This constant defines the errors that can be thrown by
 * the `argv2Object` function.
 *
 * @private
 * @constant {object} THROWS
 */
const THROWS = {
  NO_ARGS: {
    name: 'Error',
    message: 'No arguments added',
  },
  NO_MATCH_SIMPLE: {
    name: 'Error',
    message: `Some argument(s) do not follow the 'key=value' format.`,
  },
  NO_MATCH_UNIXMODE: {
    name: 'Error',
    message: `Some argument(s) do not follow the Unix-style command-line format.`,
  },
};

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe('CryptoDriver', () => {
  const original = process.argv;

  beforeEach(() => {
    process.argv = [...original];
  });

  afterEach(() => {
    process.argv = original;
  });

  it('should throw an error when no arguments are provided', () => {
    process.argv = ['node', 'script.js'];
    assert.throws(() => argv2Object(), THROWS.NO_ARGS);
  });

  it('should throw an error when an argument does not match the expected format', () => {
    Object.assign(process.argv, {
      2: '-task',
      3: 'invalid-arg',
    });
    assert.throws(() => argv2Object(), THROWS.NO_MATCH_SIMPLE);
  });

  it('should throw an error when a Unix-style argument does not match the expected format', () => {
    Object.assign(process.argv, {
      2: 'task',
      3: 'invalid-arg',
    });
    assert.throws(() => argv2Object(true), THROWS.NO_MATCH_UNIXMODE);
  });

  it('should convert simple key-value pairs to an object', () => {
    Object.assign(process.argv, {
      2: 'name=John',
      3: 'age=30',
      4: 'level=0',
    });
    const result = argv2Object();
    assert.deepStrictEqual(result, { name: 'John', age: '30', level: '0' });
  });

  it('should convert Unix-style options to an object', () => {
    Object.assign(process.argv, {
      2: '-a',
      3: '--name=John',
      4: '--is-admin',
    });
    const result = argv2Object(true);
    assert.deepStrictEqual(result, { a: true, name: 'John', is_admin: true });
  });
});

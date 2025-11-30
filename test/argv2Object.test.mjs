/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file This file contains the test for the `argv2Object` function.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES
import { describe, it, afterEach, beforeEach } from 'node:test';
import assert from 'node:assert';

// » IMPORT MODULES
import argv2Object from '#argv2Object';

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * This constant defines the errors that can be thrown by
 * the `argv2Object` function.
 *
 * @private
 * @constant {object} THROWS
 */
const THROWS_ERRORS_MESSAGES = {
  INVALID_UNIXMODE_TYPE: {
    name: 'TypeError',
    message: 'The "unixmode" parameter must be a boolean value',
  },
  NO_ARGUMENTS: {
    name: 'Error',
    message: 'No command-line arguments were provided',
  },
  NO_MATCH_SIMPLE: {
    name: 'Error',
    message: `Arguments must follow "key=value" format`,
  },
  NO_MATCH_UNIXMODE: {
    name: 'Error',
    message: `Arguments must follow Unix-style format (-a, --option=value)`,
  },
};

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe('argv2Object', () => {
  const original = process.argv;

  beforeEach(() => {
    process.argv = [...original];
  });

  afterEach(() => {
    process.argv = original;
  });

  it('should throw an "TypeError" when "unixmode" is not a boolean type', () => {
    Object.assign(process.argv, {
      2: 'task',
      3: 'invalid-arg',
    });
    assert.throws(() => argv2Object(12), THROWS_ERRORS_MESSAGES.INVALID_UNIXMODE_TYPE);
  });

  it('should throw an "Error" when no arguments are provided', () => {
    process.argv = ['node', 'script.js'];
    assert.throws(() => argv2Object(), THROWS_ERRORS_MESSAGES.NO_ARGS);
  });

  it('should throw an "Error" when an argument does not match the expected format', () => {
    Object.assign(process.argv, {
      2: '-task',
      3: 'invalid-arg',
    });
    assert.throws(() => argv2Object(), THROWS_ERRORS_MESSAGES.NO_MATCH_SIMPLE);
  });

  it('should throw an "Error" when a Unix-style argument does not match the expected format', () => {
    Object.assign(process.argv, {
      2: 'task',
      3: 'invalid-arg',
    });
    assert.throws(() => argv2Object(true), THROWS_ERRORS_MESSAGES.NO_MATCH_UNIXMODE);
  });

  it('should convert simple key-value pairs to an object', () => {
    Object.assign(process.argv, {
      2: 'name=John',
      3: 'age=30',
      4: 'level=0',
    });
    const result = argv2Object();
    assert.deepStrictEqual(result, { name: 'John', age: 30, level: 0 });
  });

  it('should convert Unix-style options to an object', () => {
    Object.assign(process.argv, {
      2: '-h',
      3: '--help',
      4: '--name=John',
      5: '--is-admin',
    });
    const result = argv2Object(true);
    assert.deepStrictEqual(result, { h: true, help: true, name: 'John', is_admin: true });
  });
});

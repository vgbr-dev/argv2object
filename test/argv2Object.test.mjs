// @ts-check
/**
 * @file Tests command-line argument parsing, value conversion, and key formatting.
 *
 * @module argv2Object.test
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODEJS MODULES
import { suite, test } from 'node:test';
import assert from 'node:assert/strict';

// » IMPORT LOCAL MODULES
import argv2Object from '#argv2Object';
import { convertValue, formatKey } from '#functions';
import { COMMAND_LINE_PATTERNS, ERROR_MESSAGES } from '#constants';

// ━━ FUNCTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Runs `callback` with `process.argv` replaced by the given arguments.
 *
 * Restores the original `process.argv` even if `callback` throws.
 *
 * @private
 * @template T
 * @param {string[]} argumentsv - The arguments to expose via `process.argv`.
 * @param {() => T} callback - The function to run.
 * @returns {T} The value returned by `callback`.
 */
const withArguments = (argumentsv, callback) => {
  const originalArguments = process.argv;
  process.argv = ['node', 'script.mjs', ...argumentsv];

  try {
    return callback();
  } finally {
    process.argv = originalArguments;
  }
};

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
suite('argv2Object Module', () => {
  test('Validation', async subtest => {
    await subtest.test('should throw TypeError when unixmode is not boolean', () => {
      assert.throws(() => {
        // @ts-expect-error Exercise runtime validation for untyped JavaScript callers.
        argv2Object('invalid');
      }, TypeError);
    });

    await subtest.test('should throw Error when no arguments are provided', () => {
      assert.throws(() => withArguments([], () => argv2Object()), {
        message: ERROR_MESSAGES.NO_ARGUMENTS,
      });
    });

    await subtest.test('should throw Error when simple format is invalid', () => {
      assert.throws(() => withArguments(['invalid'], () => argv2Object()), {
        message: ERROR_MESSAGES.NO_MATCH_SIMPLE,
      });
    });

    await subtest.test('should throw Error when unix format is invalid', () => {
      assert.throws(() => withArguments(['--bad_name'], () => argv2Object(true)), {
        message: ERROR_MESSAGES.NO_MATCH_UNIXMODE,
      });
    });
  });

  test('Simple Mode', async subtest => {
    await subtest.test('should convert key=value pairs', () => {
      const result = withArguments(['name=John', 'age=30', 'level=0'], () => argv2Object());

      assert.deepEqual(result, { name: 'John', age: 30, level: 0 });
    });

    await subtest.test('should convert numeric values', () => {
      const result = withArguments(['count=42', 'price=3.14', 'negative=-5'], () => argv2Object());

      assert.deepEqual(result, { count: 42, price: 3.14, negative: -5 });
    });

    await subtest.test('should convert boolean values', () => {
      const result = withArguments(['active=true', 'verbose=false'], () => argv2Object());

      assert.deepEqual(result, { active: true, verbose: false });
    });

    await subtest.test('should preserve empty string values', () => {
      const result = withArguments(['name='], () => argv2Object());

      assert.deepEqual(result, { name: '' });
    });

    await subtest.test('should preserve equals signs inside the value', () => {
      const result = withArguments(['url=https://example.com?a=1&b=2'], () => argv2Object());

      assert.deepEqual(result, { url: 'https://example.com?a=1&b=2' });
    });

    await subtest.test('should use the last value for repeated keys', () => {
      const result = withArguments(['name=John', 'name=Victor'], () => argv2Object());

      assert.deepEqual(result, { name: 'Victor' });
    });
  });

  test('Unix Mode', async subtest => {
    await subtest.test('should convert short and long flags to true', () => {
      const result = withArguments(['-h', '--help', '--is-admin'], () => argv2Object(true));

      assert.deepEqual(result, { h: true, help: true, is_admin: true });
    });

    await subtest.test('should convert --key=value pairs', () => {
      const result = withArguments(['--name=John', '--age=30'], () => argv2Object(true));

      assert.deepEqual(result, { name: 'John', age: 30 });
    });

    await subtest.test('should convert short flags with explicit values', () => {
      const result = withArguments(['-p=8080'], () => argv2Object(true));

      assert.deepEqual(result, { p: 8080 });
    });

    await subtest.test('should support numbers in long option keys', () => {
      const result = withArguments(['--option2=value'], () => argv2Object(true));

      assert.deepEqual(result, { option2: 'value' });
    });

    await subtest.test('should preserve equals signs inside unix values', () => {
      const result = withArguments(['--url=https://example.com?a=1'], () => argv2Object(true));

      assert.deepEqual(result, { url: 'https://example.com?a=1' });
    });

    await subtest.test('should preserve explicit empty values', () => {
      const result = withArguments(['--empty='], () => argv2Object(true));

      assert.deepEqual(result, { empty: '' });
    });

    await subtest.test('should convert valueless flags to true', () => {
      const result = withArguments(['--enabled'], () => argv2Object(true));

      assert.deepEqual(result, { enabled: true });
    });
  });

  test('convertValue', async subtest => {
    await subtest.test('should convert supported finite numeric strings', () => {
      assert.equal(convertValue('42'), 42);
      assert.equal(convertValue('-3.5'), -3.5);
      assert.equal(convertValue('1e3'), 1000);
    });

    await subtest.test('should convert signed and fractional numeric strings', () => {
      assert.equal(convertValue('+42'), 42);
      assert.equal(convertValue('.5'), 0.5);
      assert.equal(convertValue('5.'), 5);
      assert.equal(convertValue('-1e3'), -1000);
    });

    await subtest.test('should preserve non-decimal numeric strings', () => {
      assert.equal(convertValue('0xFF'), '0xFF');
      assert.equal(convertValue('0b101'), '0b101');
      assert.equal(convertValue('1_000'), '1_000');
      assert.equal(convertValue('Infinity'), 'Infinity');
      assert.equal(convertValue('1e999'), '1e999');
    });

    await subtest.test('should preserve text that is not fully numeric', () => {
      assert.equal(convertValue('12px'), '12px');
    });

    await subtest.test('should preserve empty strings and convert undefined to true', () => {
      assert.equal(convertValue(''), '');
      assert.equal(convertValue(undefined), true);
    });
  });

  test('formatKey', async subtest => {
    await subtest.test('should convert to camelCase', () => {
      assert.equal(formatKey('--some-FLAG', 'camelcase'), 'someFLAG');
    });

    await subtest.test('should convert to snake_case', () => {
      assert.equal(formatKey('--some-flag', 'snakecase'), 'some_flag');
    });

    await subtest.test('should preserve casing when no mode is provided', () => {
      assert.equal(formatKey('--some-flag'), 'some-flag');
    });

    await subtest.test('should reject invalid casing modes', () => {
      assert.throws(() => {
        // @ts-expect-error Exercise runtime validation for untyped JavaScript callers.
        formatKey('--flag', 'invalid');
      }, TypeError);
    });
  });

  test('Constants', async subtest => {
    await subtest.test('should keep validation patterns immutable', () => {
      assert.equal(Object.isFrozen(COMMAND_LINE_PATTERNS), true);
      assert.equal(Object.isFrozen(ERROR_MESSAGES), true);
    });
  });
});

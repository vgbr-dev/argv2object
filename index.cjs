/* eslint-disable import/no-commonjs */
/**
 * @file Entry point for `CommonJS` consumers.
 *
 * Provides compatibility layer for Node.js environments
 * using CommonJS require() system.
 *
 * This wrapper adapts the ESM default export to CommonJS
 * module.exports pattern.
 *
 * @module argv2Object/cjs
 * @see {@link argv2Object}
 * @since 1.0.0
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * @typedef {import('#argv2Object').default} argv2Object
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
/**
 * @type {argv2Object}
 */
const argv2Object = require('#argv2Object').default;

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = argv2Object;

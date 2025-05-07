/**
 * @file Entry point for CommonJS consumers.
 *
 * Provides compatibility layer for Node.js environments
 * using CommonJS require() system.
 *
 * This wrapper adapts the ESM default export to CommonJS
 * module.exports pattern.
 *
 * @module argv2object/cjs
 * @see module:argv2Object
 * @since 1.1.0
 * @example
 * // CJS Usage
 * const argv2object = require('argv2object');
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
const argv2Object = require('#argv2Object');

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = argv2Object.default;

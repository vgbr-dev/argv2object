/**
 * @file Entry point for `ES Module` consumers.
 *
 * Provides the default export of `argv2Object` functionality
 * for modern JavaScript environments using ES Modules.
 *
 * This file re-exports the main functionality from the
 * implementation module while maintaining ESM compatibility.
 *
 * @module argv2Object/esm
 * @see {@link argv2Object}
 * @since 1.1.0
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * @typedef {import('#argv2Object').default} argv2Object
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
import argv2Object from '#argv2Object';

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default argv2Object;

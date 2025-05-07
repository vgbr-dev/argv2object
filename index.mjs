/**
 * @file Entry point for ES Module consumers.
 *
 * Provides the default export of argv2object functionality
 * for modern JavaScript environments using ES Modules.
 *
 * This file re-exports the main functionality from the
 * implementation module while maintaining ESM compatibility.
 *
 * @module argv2object/esm
 * @see module:argv2Object
 * @since 1.1.0
 * @example
 * // ESM Usage
 * import argv2object from 'argv2object';
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT LOCAL MODULES
import argv2Object from '#argv2Object';

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default argv2Object;

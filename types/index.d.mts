/**
 * Value produced by converting a raw command-line argument.
 */
export type ArgumentValue = string | number | boolean;

/**
 * Parsed command-line arguments keyed by their normalized names.
 */
export type ArgvObject = Record<string, ArgumentValue>;

/**
 * Converts command-line arguments from `process.argv` into an object.
 *
 * @param unixmode - Whether to parse Unix-style options. Defaults to `false`.
 * @returns The object created from the command-line arguments.
 * @throws {TypeError} If `unixmode` is not a boolean.
 * @throws {Error} If no command-line arguments are provided.
 * @throws {Error} If any argument does not match the selected format.
 */
declare function argv2Object(unixmode?: boolean): ArgvObject;

export default argv2Object;

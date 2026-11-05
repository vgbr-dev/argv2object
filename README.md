# argv2Object

A lightweight utility for converting command-line arguments into a JavaScript key-value object.

## Table of Contents

- [Installation](#installation)
- [Importing](#importing)
- [Usage](#usage)
- [Supported Argument Formats](#supported-argument-formats)
  - [Simple key-value pairs](#simple-key-value-pairs)
  - [Unix-style command-line options](#unix-style-command-line-options)
- [Value Conversion](#value-conversion)
- [Key Formatting](#key-formatting)
- [API](#api)
  - [Type Definitions](#type-definitions)
  - [`argv2Object()`](#argv2object)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install `argv2object` using npm:

```sh
npm install argv2object
```

## Importing

Import the default export into your application:

```js
import argv2Object from 'argv2object';
```

> CommonJS support depends on the package entry points and exports configuration.

## Usage

`argv2Object` reads command-line arguments from `process.argv`, starting after the Node.js executable and script path.

It supports two parsing modes:

- **Simple mode:** Parses `key=value` arguments.
- **Unix mode:** Parses Unix-style flags and long options.

## Supported Argument Formats

### Simple key-value pairs

Run your application with key-value arguments:

```sh
node script.js name=John age=30 level=admin api2=production
```

Parse the arguments:

```js
import argv2Object from 'argv2object';

const args = argv2Object();

console.log(args);
// {
//   name: 'John',
//   age: 30,
//   level: 'admin',
//   api2: 'production'
// }
```

In simple mode, every argument must contain an `=`. Bare keys such as `name` are rejected.

Keys must start with a letter and may contain letters, digits, and hyphen-separated segments.

### Unix-style command-line options

Enable Unix mode by passing `true`:

```sh
node script.js -h --help --name=John --age=30 --is-admin
```

Parse the arguments:

```js
import argv2Object from 'argv2object';

const args = argv2Object(true);

console.log(args);
// {
//   h: true,
//   help: true,
//   name: 'John',
//   age: 30,
//   is_admin: true
// }
```

Unix mode supports:

| Format           | Description               | Example       |
| ---------------- | ------------------------- | ------------- |
| `-x`             | Short flag                | `-h`          |
| `-x=value`       | Short option with a value | `-p=3000`     |
| `--option`       | Long flag                 | `--help`      |
| `--option=value` | Long option with a value  | `--port=3000` |

Long option keys must start with a letter and may contain letters, digits, and hyphens.

Short options consist of exactly one letter.

**Important:** Arguments must use the equals sign to provide values. Separate key-value arguments such as `--port 3000` are not supported.

Argument values are converted using the same rules as simple mode. For example, `--age=30` produces the number `30`, and `--active=true` produces the boolean `true`.

**Grammar differences between modes:**

- Simple mode keys cannot contain consecutive hyphens (`key--value`) or a trailing hyphen (`key-=value`).
- Unix long option keys allow consecutive hyphens (`--key--value`) and a trailing hyphen (`--key-`), matching common Unix CLI conventions.

## Value Conversion

Argument values are automatically converted when they match supported formats.

| Input           | Result   | JavaScript type |
| --------------- | -------- | --------------- |
| `name=John`     | `'John'` | `string`        |
| `age=30`        | `30`     | `number`        |
| `price=3.14`    | `3.14`   | `number`        |
| `active=true`   | `true`   | `boolean`       |
| `enabled=false` | `false`  | `boolean`       |
| `empty=`        | `''`     | `string`        |
| `--verbose`     | `true`   | `boolean`       |

Numeric conversion supports signed decimal numbers, fractional values, and scientific notation.

Examples:

```text
count=42
temperature=-3.5
ratio=.75
price=5.
distance=1e3
```

Values that do not match the supported numeric format remain strings.

For example:

```text
hex=0xFF
infinity=Infinity
version=1.2.3
```

Values may contain additional equals signs. Only the first equals sign separates the key from its value.

```sh
node script.js url=https://example.com?name=John&active=true
```

A key without an explicit value in Unix mode is interpreted as a boolean flag with the value `true`.

## Key Formatting

Parsed keys are normalized to `snake_case`.

For example:

| Original key  | Result      |
| ------------- | ----------- |
| `--is-admin`  | `is_admin`  |
| `--user-name` | `user_name` |
| `--api2-key`  | `api2_key`  |
| `-h`          | `h`         |

When multiple arguments produce the same key, the last value takes precedence.

## API

### Type Definitions

The library uses the following JSDoc types:

```js
/**
 * Supported values produced by command-line argument parsing.
 * @typedef {string|number|boolean} ArgumentValue
 */

/**
 * Object containing parsed command-line arguments.
 * @typedef {Record<string, ArgumentValue>} ArgvObject
 */
```

> `CaseMode` is an internal type used by `formatKey` and is not part of the public API.

### `argv2Object(unixmode = false)`

```js
argv2Object(unixmode = false): ArgvObject
```

Reads command-line arguments from `process.argv` and converts them into an object.

**Arguments:**

| Name       | Type      | Default | Description                                             |
| ---------- | --------- | ------- | ------------------------------------------------------- |
| `unixmode` | `boolean` | `false` | Enables Unix-style argument parsing when set to `true`. |

**Returns:**

Returns an `ArgvObject` containing the parsed command-line arguments.

**Examples:**

```js
const simpleArguments = argv2Object();
const unixArguments = argv2Object(true);
```

## Error Handling

The function throws errors when its input or command-line arguments do not satisfy the expected format.

| Error type  | Condition                                                       |
| ----------- | --------------------------------------------------------------- |
| `TypeError` | `unixmode` is not a boolean.                                    |
| `Error`     | No command-line arguments were provided.                        |
| `Error`     | At least one argument does not match the selected parsing mode. |

All arguments must match the selected mode. If any argument is invalid, parsing is rejected.

## Contributing

Contributions, issues, and feature requests are welcome.

Visit the [issues page](https://github.com/vgbr-dev/argv2object/issues) to report problems or suggest improvements.

## License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.

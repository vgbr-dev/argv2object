# argv2Object

A utility function for converting command-line arguments to a key-value object.

## Table of Contents

- [Installation](#installation)
- [Importing](#importing)
- [Usage](#usage)
- [Dual Module Support](#dual-module-support)
- [Examples](#examples)
  - [Simple key-value pairs](#simple-key-value-pairs)
  - [Unix-style command-line options](#unix-style-command-line-options)
- [API](#api)
  - [Type Definitions](#type-definitions)
  - [`argv2Object()`](#argv2object-1)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install argv2Object via [npm](https://www.npmjs.com/package/argv2Object):

```sh
npm install argv2object
```

## Importing

To use argv2Object in your JavaScript application, first import it:

```js
// Using ES6 imports
import argv2Object from 'argv2object';

// Using Node.js `require()`
const argv2Object = require('argv2object');
```

## Usage

Converts command-line arguments to a key-value object.

```sh
# Command line input:
node script.js --task=some-task --execute -h --name=John

```

```js
const argv2Object = require('argv2object');

// UNIX command line mode true
const args = argv2Object(true);
console.log(args.task); // "some-task"

console.log(args.execute); // true

console.log(args.h); // true

console.log(args.name); // "John"

```

## Dual Module Support

This package supports both:

- ES Modules: `import argv2object from 'argv2object'`
- CommonJS: `const argv2object = require('argv2object')`

The architecture uses separate entry points while sharing the same implementation.

## System Requirements

- **Node.js 14+** (Recommended for full support)
- **Node.js 12.x** (Experimental support)
- **Versiones anteriores**: Use version 1.x of this package

## Examples

### Simple key-value pairs

```sh
# Command line input:
node script.js task=some-task age=30 name=John level=admin

```

```js
const args = argv2Object();
console.log(args);
// Output: { name: 'John', age: 30, level: 'admin' }
```

### Unix-style command-line options

```sh
# Command line input:
node --watch script.js -h --help --name=John --is-admin

```

```js
const args = argv2Object(true);
console.log(args);
// Output: { h: true, help: true, name: 'John', is_admin: true }
```

## API

### Type Definitions

- `ArgvObject`: An `Object` with keys and values corresponding to the provided arguments.

### `argv2Object()`

The `argv2Object(unixmode = false): => ArgvObject` function takes the command-line arguments and converts them to a JavaScript object with keys and values based on the provided argument format. The format can be either simple key-value pairs (e.g. "key=value") or Unix-style command-line options (e.g. "-o --option=value").

Arguments

| Name       | Type      | Default | Description                                       |
|------------|-----------|---------|---------------------------------------------------|
| `unixmode` | `boolean` | `false` | Whether to parse Unix-style command-line options. |

Returns

Returns an `Object` with keys and values corresponding to the provided arguments.

Throws

| Type    | Description                                                                                     |
|---------|-------------------------------------------------------------------------------------------------|
| `TypeError` | If `unixmode` is not of type `boolean`.                                                     |
| `Error`     | If no arguments are provided from command line.                                             |
| `Error`     | If `unixmode` is `true` and an argument does not follow the Unix-style command-line format. |
| `Error`     | If `unixmode` is `false` and an argument does not follow the "key=value" format.            |

## Contributing

Contributions, issues and feature requests are welcome. Feel free to check [issues page](https://github.com/vgbr-dev/argv2object/issues) if you want to contribute.

## License

Distributed under the MIT License. See LICENSE for more information.

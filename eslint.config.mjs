{
  "extends": [
    "airbnb-base",
    "prettier"
  ],
  "plugins": [
    "import",
    "prettier"
  ],
  "parser": "",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "env": {
    "browser": false,
    "commonjs": true,
    "es2021": true,
    "node":true
  },
  "settings": {
    "import/resolver": "node"
  },
  "rules": {
    // » GENERAL
    "strict": [2,"global"],
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-param-reassign": ["error", { "props": false }],
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": [ "error", {
      "devDependencies": [
        "**/*.jsx",
        "configurations/forge/makers/*.js",
        "configurations/forge/publisher/*.js",
        "tools/**/*.js",
        "test/**/*.js",
        "electron/main/index.js",
        "electron/preload/index.js",
        "electron/system/**/*.js",
        "forge.config.js",
        "vite.config.js"
      ]}
    ],
    "import/no-unresolved": [0, { "ignore": ["^node:"] }],
    "import/extensions": [
      "error",
      "always",
      {
        "js": "never",
        "jsx": "never",
        "mjs": "never",
        "cjs": "never"
      }
    ],
    // » PRETTIER
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "printWidth": 100,
      "trailingComma": "all"
    }]
  }
}

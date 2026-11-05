/**
 * @file Commitlint Configuration for Commit Message Validation.
 *
 * @description Custom settings for commitlint, used to validate commit
 * messages against conventional commit standards. Defines rules for commit
 * types, subject formatting, message length, and body/footer structure.
 *
 * @see {@link https://commitlint.js.org/ | Commitlint Documentation}
 *
 * @version 1.0.0
 * @module CommitlintConfiguration
 */

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * User configuration for commitlint.
 *
 * @private
 * @typedef {import('@commitlint/types').UserConfig} UserConfig
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Allowed commit types following the Conventional Commits specification.
 *
 * @type {Array<string>}
 */
const CONVENTIONAL_COMMIT_TYPES = [
  'build',
  'ci',
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'test',
  'chore',
  'revert',
  'perf',
];

// ━━ MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Configuration object for commitlint.
 *
 * @type {UserConfig}
 */
const commitlintConfiguration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', CONVENTIONAL_COMMIT_TYPES],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default commitlintConfiguration;

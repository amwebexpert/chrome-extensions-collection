/** @type {import('ts-jest').JestConfigWithTsJest} */
const baseConfig = require('../../jest.base.config')

export default {
  ...baseConfig,
  roots: ['<rootDir>/src'],
}

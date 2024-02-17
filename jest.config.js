require('tsconfig-paths/register');
const { pathsToModuleNameMapper } = require('ts-jest')

const paths = {
  "@providers/*": ["./core/providers/*"],
  "@database/*": ["./database/*"]
};

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov', 'text', 'json-summary'],
  setupFiles: ['reflect-metadata'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/src' }),
  modulePaths: ['./src'],
  collectCoverageFrom: [
    'src/core/use-cases/**/**/*.use-case.ts'
  ]
}
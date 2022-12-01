/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail:  true,
  clearMocks:  true,
  testMatch: ["**/src/core/tests/*.test.[jt]s?(x)"]
};


module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/src/tests/mocks.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};

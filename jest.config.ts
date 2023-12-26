export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8',
  projects: [
    {
      displayName: 'backend',
      rootDir: 'projects/backend',
      testMatch: ['**/*.spec.ts', '**/*.test.ts'],
      transform: {
        '^.+\\.ts?$': 'ts-jest'
      },
      preset: 'ts-jest',
      moduleNameMapper: {
        '@core/(.*)$': '<rootDir>src/core/$1',
        '@infra/(.*)$': '<rootDir>src/infra/$1'
      }
    },
    {
      displayName: 'frontend',
      rootDir: 'projects/frontend',
      testMatch: ['**/*.spec.ts'],
      transform: {
        '^.+\\.ts?$': 'ts-jest'
      },
      preset: 'ts-jest'
    }
  ]
}

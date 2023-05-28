export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  projects: [
    {
      displayName: 'backend',
      rootDir: 'projects/backend'
    },
    {
      displayName: 'frontend',
      rootDir: 'projects/frontend'
    }
  ]
}

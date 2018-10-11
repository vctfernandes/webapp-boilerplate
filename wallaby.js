module.exports = function () {
  return {
    files: [
      { pattern: '/.env', instrument: false },
      '.env.example',
      './index.js',
      '/src/**/*'
    ],
    tests: [
      'tests/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },
    testFramework: 'jest',
    debug: true,
    workers: {
      restart: true
    }
  }
}

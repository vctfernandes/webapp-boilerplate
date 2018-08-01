const path = require('path')

module.exports = {
  'bail': true,
  'verbose': true,
  'globalSetup': path.resolve(__dirname, 'tests/globalSetup.js'),
  'globalTeardown': path.resolve(__dirname, 'tests/globalTeardown.js')
}

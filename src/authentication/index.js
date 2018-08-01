const passport = require('./passport')
const User = require('../user')

module.exports = () => {
  return {
    passport: passport({ User })
  }
}

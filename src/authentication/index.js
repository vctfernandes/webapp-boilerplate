const Passport = require('./passport')

class Authentication {
  constructor () {
    this.passport = new Passport()
  }
}

module.exports = Authentication

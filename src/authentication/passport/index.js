const passport = require('passport')

class Passport {
  constructor ({ User }) {
    passport.serializeUser((user, done) => {
      done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id)
        done(null, user)
      } catch (error) {
        done(error)
      }
    })
  }
}

module.exports = Passport

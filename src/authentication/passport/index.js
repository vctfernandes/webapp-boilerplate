const passport = require('passport')
const localStrategy = require('./local')

module.exports = ({ User }) => {
  passport.serializeUser((user, done) => done(null, user._id))

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

  localStrategy({ User })

  return passport
}

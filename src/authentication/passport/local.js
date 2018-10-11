const passport = require('passport')
const LocalStrategy = require('passport-local')

module.exports = ({ User }) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username })
        if (!user || !user.verifyPassword(password)) return done(null, false)
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  ))
}

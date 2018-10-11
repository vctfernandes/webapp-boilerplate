const { Model } = require('objectmodel')
const Db = require('../database/index')
const db = new Db()

Model.prototype.conventionForPrivate = key => key.startsWith('#')

class User extends Model({
  _id: [Object],
  name: String,
  email: String,
  password: [String],
  facebookId: [String],
  googleId: [String]
}) {
  static async create (potentialUser) {
    try {
      const user = new User(potentialUser)
      await db.users.insertOne(user)
      return user
    } catch (error) {
      throw error
    }
  }
  static async get (userQuery) {
    try {
      const user = await db.users.findOne(userQuery)
      return user ? new User(user) : user
    } catch (error) {
      throw error
    }
  }
}

module.exports = User

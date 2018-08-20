const {Model} = require('objectmodel')
const Db = require('../database/index')
const db = new Db()

class User extends Model({
  name: String,
  email: String,
  password: [String],
  facebookId: [String],
  googleId: [String]
}) {
  static async create (potentialUser) {
    try {
      const user = await db.users.insertOne({}).toArray()
      return new User(user)
    } catch (error) {
      throw error
    }
  }
}

module.exports = User

User.create({})

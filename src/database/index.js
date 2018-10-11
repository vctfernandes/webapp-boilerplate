const { MongoClient } = require('mongodb')
const proxymise = require('proxymise')
let client, db

class MongoDb {
  constructor ({ uri, dbName } = {}) {
    if (db) return db
    else return proxymise(this.connect({ uri, dbName }))
  }
  async connect ({ uri = process.env.MONGODB_URI, dbName = process.env.MONGODB_DBNAME }) {
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true })
      db = new Proxy(client.db(dbName), {
        get: (target, coll) => {
          if (target[coll]) return target[coll]
          else return target.collection(coll)
        }
      })
      await this.ensureIndexes()

      return db
    } catch (error) {
      throw error
    }
  }
  static async close ({ uri = process.env.MONGODB_URI } = {}) {
    try {
      if (!client) client = await MongoClient.connect(uri, { useNewUrlParser: true })
      await client.close()
      db = undefined
      client = undefined
    } catch (error) {
      throw error
    }
  }
  async ensureIndexes () {
    await db.createIndex('users', { email: 1 }, { unique: 1 })
  }
}

module.exports = MongoDb

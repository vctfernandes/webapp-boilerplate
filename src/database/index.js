const {MongoClient} = require('mongodb')
let db
const env = {
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DBNAME
}

class MongoDb {
  constructor () {
    if (db) return db
    else return this.connect()
  }
  async connect () {
    try {
      const client = await MongoClient.connect(env.uri, { useNewUrlParser: true })
      const dbConnection = client.db(env.dbName)
      this.ensureIndexes()

      db = dbConnection
      return db
    } catch (err) {
      throw err
    }
  }
  ensureIndexes () {

  }
}

module.exports = MongoDb

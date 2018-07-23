const {MongoClient} = require('mongodb')

const MongoDb = {
  db: undefined,
  config: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME
  },
  connect: async () => {
    if (MongoDb.db) return MongoDb.db
    try {
      const client = await MongoClient.connect(MongoDb.config.uri, { useNewUrlParser: true })
      const dbConnection = client.db(MongoDb.config.dbName)
      await MongoDb.ensureIndexes()

      MongoDb.db = dbConnection
      return MongoDb.db
    } catch (err) {
      throw err
    }
  },
  ensureIndexes: () => {

  }
}

module.exports = MongoDb.connect

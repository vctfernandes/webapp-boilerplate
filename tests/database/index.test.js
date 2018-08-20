const Database = require('../../src/database')

describe('database: ', () => {
  beforeEach(async () => {
    await Database.close()
  })

  afterAll(async () => {
    const db = await new Database()
    await db.dropCollection('testCollection')
  })

  test('instantiated database return Db object and connection gets cached', async () => {
    const db = await new Database()
    const db2 = await new Database({ uri: process.env.MONGODB_URI })
    const db3 = await new Database({ dbName: process.env.MONGODB_DBNAME })
    const db4 = await new Database({ uri: process.env.MONGODB_URI, dbName: process.env.MONGODB_DBNAME })
    await Database.close()
    const db5 = await new Database()

    expect(db.constructor.name).toBe('Db')
    expect(db2.constructor.name).toBe('Db')
    expect(db3.constructor.name).toBe('Db')
    expect(db4.constructor.name).toBe('Db')
    expect(db5.constructor.name).toBe('Db')
    expect(db).toBe(db2)
    expect(db).toBe(db3)
    expect(db).toBe(db4)
    expect(db).not.toBe(db5)
  })
  test('throws error when connect goes wrong', async () => {
    expect.assertions(1)

    await expect(new Database({ uri: 'mongodb://255.255.255.255:255' })).rejects.toThrow()
  })
  test('throws error when close goes wrong', async () => {
    expect.assertions(1)

    await new Database()

    await expect(Database.close({ uri: 'mongodb://255.255.255.255:255' })).rejects.toThrow()
  })
  test('run native MongoDb command', async () => {
    const db = await new Database()
    const collectionList = await db.listCollections().toArray()

    expect(collectionList.constructor).toBe(Array)
  })
  test('run collection shortcut commands and try a bunch of operations', async () => {
    const db = await new Database()
    await db.testCollection.insertOne({ test: true })
    await db.testCollection.updateOne({ test: true }, {$set: {updated: true}})
    const doc = await db.testCollection.findOne({ test: true })
    expect(doc).toMatchObject({
      test: true,
      updated: true
    })
    await db.testCollection.removeOne({ test: true })
    const doc2 = await db.testCollection.findOne({ test: true })
    expect(doc2).toBeNull()
  })
})

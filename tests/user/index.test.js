const Database = require('../../src/database')
const User = require('../../src/user')

const testUser = {
  name: 'Test User',
  email: 'treta@treta.com',
  password: 'letmein'
}

describe('user: ', () => {
  beforeAll(async () => {
    const db = await new Database()
    await db.users.deleteMany({ name: 'Test User' })
  })
  afterAll(async () => {
    const db = await new Database()
    await db.users.deleteMany({ name: 'Test User' })
  })

  test('create a user', async () => {
    const user = await User.create(testUser)
    expect(user).toBeInstanceOf(User)
    expect(user).toMatchObject(testUser)
  })
  test('create a repeated user', async () => {
    expect.assertions(1)
    await expect(User.create(testUser)).rejects.toThrow()
  })
  test('gets a user', async () => {
    const user = await User.get({
      email: 'treta@treta.com'
    })
    expect(user).toBeInstanceOf(User)
    expect(user).toMatchObject(testUser)
  })
  test('gets a non-existing user', async () => {
    const user = await User.get({
      email: 'donotexist@treta.com'
    })
    expect(user).toBeNull()
  })
  test('try to get user with inadequate query', async () => {
    expect.assertions(1)
    await expect(User.get('treta@treta.com')).rejects.toThrow()
  })
})

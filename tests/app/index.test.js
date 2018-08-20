const App = require('../../src/app')
const Db = require('../../src/database')
const Router = require('../../src/router')

describe('app:', () => {
  test('starts correctly', async () => {
    expect.assertions(1)

    const app = new App({Db, Router})
    await app.start()
    expect(app).toBeInstanceOf(App)
  })
})

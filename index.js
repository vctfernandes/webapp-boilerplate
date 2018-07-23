require('dotenv-safe').load()
const Db = require('@local/src/database')
const Router = require('@local/src/router')

class App {
  async start () {
    try {
      this.db = Db()
      this.router = new Router()
      console.info('App loaded!')
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}

const app = new App()
app.start()

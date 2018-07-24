class App {
  constructor ({Db, Router}) {
    Object.assign(this, arguments[0])
  }

  async start () {
    try {
      this.db = await new this.Db()
      this.router = new this.Router()
      console.info('App loaded!')
    } catch (err) {
      throw err
    }
  }
}

module.exports = App

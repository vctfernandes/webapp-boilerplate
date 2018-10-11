require('dotenv-safe').load()
const App = require('./src/app')
const Db = require('./src/database')
const Router = require('./src/router')

const app = new App({ Db, Router })
app.start()

process.on('unhandledRejection', (reason) => {
  throw reason
})
process.on('uncaughtException', (error) => {
  throw error
})

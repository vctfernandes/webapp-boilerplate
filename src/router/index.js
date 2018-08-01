const express = require('express')
const path = require('path')
const auth = require('../authentication')({ User: {} })
const serveStatic = require('serve-static')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
class Router {
  constructor () {
    this.router = express()
    this.router.set('views', path.resolve(__dirname, '../views'))

    this.router.use(serveStatic(path.resolve(__dirname, '../../public')))
    this.router.use(cookieParser())
    this.router.use(bodyParser.urlencoded({ extended: true }))
    this.router.use(session({ secret: process.env.EXPRESS_SECRET, resave: true, saveUninitialized: true }))
    this.router.use(auth.passport.initialize())
    this.router.use(auth.passport.session())

    this.router.use('/', require('./root'))
    this.router.use('/auth', require('./authentication'))

    this.router.listen(process.env.PORT)
  }
}

module.exports = Router

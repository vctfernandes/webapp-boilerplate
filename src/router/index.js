const express = require('express')
const path = require('path')
const passport = require('passport')
const serveStatic = require('serve-static')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
class Router {
  constructor () {
    this.app = express()
    this.app.use(serveStatic(path.resolve(__dirname, '../../public')))
    this.app.use(cookieParser())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(session({ secret: process.env.EXPRESS_SECRET, resave: true, saveUninitialized: true }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.use('/', require('./root'))
    this.app.use('/auth', require('./authentication'))
  }
}

module.exports = Router

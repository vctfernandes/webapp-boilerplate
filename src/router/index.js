const express = require('express')

class Router {
  constructor () {
    this.router = express()
    this.router.use('/', this.root)
  }

  root (req, res, next) {
    next()
  }
}

module.exports = Router

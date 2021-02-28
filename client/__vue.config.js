'use strict'

const fs = require('fs')
const appRoot = process.cwd()

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync(`${appRoot}/certs/server.key`),
      cert: fs.readFileSync(`${appRoot}/certs/server.crt`),
    },
    hotOnly: true
  }
}
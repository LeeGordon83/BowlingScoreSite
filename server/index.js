'use strict'

const Hapi = require('@hapi/hapi')

const createServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })
  const routes = [
    {
      method: 'GET',
      path: '/',
      options: {
        handler: (request, h) => {
          return 'ok'
        }
      }
    }
  ]
  server.route(routes)
  return server
}

module.exports = createServer

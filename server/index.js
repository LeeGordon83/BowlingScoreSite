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
          return h.view('home', { name: 'Lee', frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
        }
      }
    },
    {
      method: 'POST',
      path: '/',
      options: {
        handler: (request, h) => {
          console.log(request)
          return h.view('home', { name: 'Lee', frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], result: '20' })
        }
      }
    }
  ]
  server.route(routes)
  server.register(require('@hapi/vision'))

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  })

  return server
}

module.exports = createServer

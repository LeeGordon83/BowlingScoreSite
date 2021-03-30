const createServer = require('./server/index')
createServer()
  .then(server => server.start())
  .catch(err => {
    console.error('App crashed', err)
    process.exit(1)
  })

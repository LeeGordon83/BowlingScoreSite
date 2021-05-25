const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = Lab.script()

exports.lab = lab

const createServer = require('../../server/index.js')

lab.experiment('web test', () => {
  let server
  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('get / route works', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    console.log({ response })
    Code.expect(response.result).to.contain('Bowling Calculator')
  })

  lab.test('post / route works', async () => {
    const options = {
      method: 'POST',
      payload: '{}',
      url: '/'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    console.log({ response })
    Code.expect(response.result).to.contain('20')
  })
})

// Require the framework and instantiate it
const server = require('fastify')({ logger: true })

const PORT = process.env.PORT || 3000

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.get('/debug', async (request, reply) => {
  console.log(request.headers)
  return JSON.stringify(request.headers, null, 4)
})

// Run the server!
const start = async () => {
  try {
    await server.listen(PORT, '0.0.0.0')
    server.log.info(`server listening on ${server.server.address().port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

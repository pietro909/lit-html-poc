import fs from 'fs'
import litHtmlServer from '@popeindustries/lit-html-server'
import fastify from 'fastify'
import index from '../client/index.js'

const server = fastify({ logger: true })
const PORT = process.env.PORT || 3000

// Declare a route
server.get('/', (request, reply) => {
  // TODO: render template
  const data = { title: 'Home', api: '/api/home' };

  litHtmlServer.renderToString(index(data)).then(page => {
    reply.type('text/html')
    reply.send(page)
  })
})

server.post('/source', async (request, reply) => {
  console.log(request)
  return "done"
})


server.get('/debug', (request, reply) => {
  console.log(request.headers)

  fs.readFile('server/index.html', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    reply.type('text/html')
    const parsed = data.replace(/HEADERS/, JSON.stringify(request.headers, null, 4))
    reply.send(parsed)
  })
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

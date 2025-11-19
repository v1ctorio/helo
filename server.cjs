const fastify = require('fastify')({ logger: true })
const path = require("node:path")

fastify.register(require('fastify-ip',{
    strict: false,
    isAws: false,
}))

fastify.register(require("@fastify/static"),{
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

fastify.get('/', async function handler (request, reply) {
  return reply.sendFile('page.html')
})


fastify.get('/ip', async function handler(request, reply) {
    ip = request.ip
    if (ip) ip + '/'+ip 
    else ip = ''

    res = await fetch("https://ip.hackclub.com/ip"+ip) 
    j = await res.json()
    reply.send(j)
})

fastify.listen({ port: process.env.PORT || 6969 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})


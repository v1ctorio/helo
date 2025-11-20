const fastify = require('fastify')({ logger: true })
const path = require("node:path")

const {FastifyReceiver} = require("@seratch_/bolt-fastify")
const {App} = require("@slack/bolt")

const receiver = new FastifyReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  fastify,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
   receiver })
const responseBlocks = {
		blocks: [
			{
				type: "video",
				alt_text: "embedded site",
				title: {
					type: "plain_text",
					text: "H E L o",
					emoji: true
				},
				thumbnail_url: "https://cachet.dunkirk.sh/users/U072PTA5BNG/r",
				video_url: "https://helo.vic.wf/"
			}
		]
	}

app.command('/helo', async({ack, respond})=>{
  await ack()
  await respond(responseBlocks)

})

app.event('app_mention', async({say})=>{
  await say(responseBlocks)
})
fastify.register(require('fastify-ip'),{
    strict: false,
    isAws: false,
})

fastify.register(require("@fastify/static"),{
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

fastify.get('/', async function handler (request, reply) {
  return reply.sendFile('page.html')
})


fastify.get('/ip', async function handler(request, reply) {
    ip = request.ip
    if (ip) ip = '/'+ip 
    else ip = ''

    res = await fetch("https://ip.hackclub.com/ip"+ip) 
    j = await res.json()
    reply.send(j)
})

fastify.listen({ port: process.env.PORT || 6969, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})


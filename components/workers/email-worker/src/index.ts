import { asyncRenderFile } from '~/utils.ts'
import { Worker } from 'bullmq'
import { Redis } from 'ioredis'
import mjml2html from 'mjml'
import { Resend } from 'resend'
import { type EmailQueueData, prisma } from 'schema'

console.log(await prisma.order.count())

const connection = new Redis(Bun.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.max(Math.min(Math.exp(times), 20000), 1000),
})

const resend = new Resend(Bun.env.RESEND_API_KEY)

const worker = new Worker<EmailQueueData>(
  '{email_queue}',
  async (job) => {
    const content = await asyncRenderFile(job.data.template, job.data.data)
    const htmlOutput = mjml2html(content, { validationLevel: 'strict' })

    return resend.emails.send({
      to: job.data.email,
      html: htmlOutput.html,
      subject: job.data.subject,
      from: 'onboarding@resend.dev',
    })
  },
  {
    connection,
    removeOnFail: {
      count: 100,
      age: 2592000,
    },
    removeOnComplete: {
      count: 10,
      age: 604800,
    },
    limiter: {
      max: 100,
      duration: 1000 * 60 * 60 * 24,
    },
  },
)

worker.on('error', (error) => {
  console.log('Worker Error ' + JSON.stringify(error))
})

worker.on('failed', (job, error) => {
  console.log('Worker Failed ' + error)
})

worker.on('completed', (job) => {
  console.log('Worker Completed ' + job.id)
})

worker.on('ready', () => {
  console.log('Worker Ready')
})

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

async function cleanup() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl+C) or SIGTERM')

  await worker.close()
  await prisma.$disconnect()

  process.exit()
}

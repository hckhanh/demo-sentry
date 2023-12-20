import { Worker } from 'bullmq'
import Redis from 'ioredis'
import mjml2html from 'mjml'
import { Resend } from 'resend'

import { asyncRenderFile } from './utils.ts'
import { prisma } from 'schema/index.ts'

const connection = new Redis(Bun.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

const resend = new Resend(Bun.env.RESEND_API_KEY)

type EmailQueueData = {
  email: string
  subject: string
  template: string
  data: Record<string, any>
}

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
    removeOnComplete: {
      age: 604800,
      count: 100,
    },
    removeOnFail: {
      count: 100,
      age: 2592000,
    },
  },
)

worker.on('error', (error) => {
  console.log('Error ' + error)
})

worker.on('failed', (job, error) => {
  console.log('Failed ' + error)
})

worker.on('completed', (job) => {
  console.log('Completed ' + job.id)
})

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

async function cleanup() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl+C) or SIGTERM')

  await worker.close()
  await prisma.$disconnect()

  process.exit()
}

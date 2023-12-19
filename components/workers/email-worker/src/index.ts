import { Worker } from 'bullmq'
import Redis from 'ioredis'
import mjml2html from 'mjml'
import { Resend } from 'resend'
import { prisma } from 'schema'

import { asyncRenderFile } from './utils.ts'

const connection = new Redis(Bun.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

const resend = new Resend(Bun.env.RESEND_API_KEY)

type EmailQueueData = {
  template: string
  data: Record<string, any>
}

const worker = new Worker<EmailQueueData>(
  '{email_queue}',
  async (job) => {
    const order = await prisma.order.findUnique({
      where: { id: job.data.data.orderId },
    })

    if (order) {
      const content = await asyncRenderFile(job.data.template, job.data.data)
      const htmlOutput = mjml2html(content, { validationLevel: 'strict' })

      return resend.emails.send({
        to: order.email,
        html: htmlOutput.html,
        from: 'onboarding@resend.dev',
        subject: `Your Purchase Confirmation`,
      })
    }
  },
  {
    connection,
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

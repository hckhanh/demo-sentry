import { Queue } from 'bullmq'
import Redis from 'ioredis'

const connection = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

type EmailQueueData = {
  template: string
  data: Record<string, any>
}

export const emailQueue = new Queue<EmailQueueData>('{email_queue}', {
  connection,
})

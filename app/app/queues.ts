import { Queue } from 'bullmq'
import Redis from 'ioredis'
import type { EmailQueueData, OrderCanceledQueueData } from 'schema'

const connection = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

export const emailQueue = new Queue<EmailQueueData>('{email_queue}', {
  connection,
})

export const orderCanceledQueue = new Queue<OrderCanceledQueueData>('{order_canceled_queue}', {
  connection,
})
import type { EmailQueueData, OrderCancelQueueData } from 'schema'

import { Queue } from 'bullmq'
import Redis from 'ioredis'

const connection = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.max(Math.min(Math.exp(times), 20000), 1000),
})

export const emailQueue = new Queue<EmailQueueData>('{email_queue}', {
  connection,
})

export const orderCancelQueue = new Queue<OrderCancelQueueData>(
  '{order_cancel_queue}',
  { connection },
)

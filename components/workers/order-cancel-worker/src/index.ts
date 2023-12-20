import { Worker } from 'bullmq'
import Redis from 'ioredis'
import { type OrderCancelQueueData, prisma } from 'schema'

const connection = new Redis(Bun.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

const worker = new Worker<OrderCancelQueueData>(
  '{order_cancel_queue}',
  async (job) => {
    return prisma.order.update({
      select: { id: true },
      data: { status: 'CANCELED' },
      where: { id: job.data.orderId },
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

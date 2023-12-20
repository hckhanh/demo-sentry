import { Worker } from 'bullmq'
import Redis from 'ioredis'
import { prisma, type OrderCanceledQueueData } from 'schema'

const connection = new Redis(Bun.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
})

const worker = new Worker<OrderCanceledQueueData>(
  '{order_canceled_queue}',
  async (job) => {
    return prisma.order.update({
      where: { id: job.data.orderId, },
      data: { status: 'CANCELED', },
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

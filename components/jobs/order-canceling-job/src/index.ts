import { Cron } from 'croner'
import { prisma } from 'schema'

const job = new Cron(
  '0 0 0 * * *', // cronTime
  {
    protect: true,
    timezone: 'America/Los_Angeles',
  },
  async () => {
    const orders = await prisma.order.findMany({
      where: { status: 'CREATED' },
    })

    await prisma.order.updateMany({
      data: { status: 'CANCELED' },
      where: { id: { in: orders.map((order) => order.id) } },
    })
  }
)

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

function cleanup() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl+C) or SIGTERM')

  job.stop()

  process.exit()
}

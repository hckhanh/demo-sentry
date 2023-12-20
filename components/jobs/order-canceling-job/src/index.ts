import { CronJob } from 'cron'
import { prisma } from 'schema'

const job = new CronJob(
  '0 0 0 * * *', // cronTime
  async () => {
    const orders = await prisma.order.findMany({
      where: { status: 'CREATED' },
    })

    await prisma.order.updateMany({
      data: { status: 'CANCELED' },
      where: { id: { in: orders.map((order) => order.id) } },
    })
  }, // onTick
  null, // onComplete
  false, // start
  'America/Los_Angeles', // timeZone
)

job.start()

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

function cleanup() {
  console.log('\nGracefully shutting down from SIGINT (Ctrl+C) or SIGTERM')

  job.stop()

  process.exit()
}

import { Worker, Queue } from 'bullmq'
import {prisma} from 'schema'
import {loadFile, renderFile, templates, render} from 'squirrelly'
import { asyncRenderFile } from './utils'

type EmailQueueData = {
  template: string,
  data: any
}

const worker = new Worker<EmailQueueData>('{email_queue}', async job => {
  console.log(job.data, job.id)
  const order = await prisma.order.findUnique({where: {id: job.data.data.orderId}})

  if (order){
    const content = await asyncRenderFile(job.data.template, job.data.data)

    console.log('content', content)
  }

}, {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    tls: {}
  },
  removeOnFail: {
    age: 2592000,
    count: 100
  }
})

worker.on("error", (error) => {
  console.log("Error " + error)
})

worker.on("failed", (job, error) => {
  console.log("Failed " + error)
})

worker.on("completed", (job) => {
  console.log("Completed " + job.id)
})

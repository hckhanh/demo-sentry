import { Worker } from 'bullmq'

const worker = new Worker('myQueue', async job => {
  // Processing of your job here...
  console.log('Processing job with id: ', job.id)
}, {
  concurrency:1,
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
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

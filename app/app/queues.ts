import {Queue} from 'bullmq'

type EmailQueueData = {
  template: string,
  data: any
}

export const emailQueue = new Queue<EmailQueueData>("{email_queue}", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    tls: {},
  },
})

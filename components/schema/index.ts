import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export type EmailQueueData = {
  email: string
  subject: string
  template: string
  data: Record<string, any>
}

export type OrderCanceledQueueData = {
  orderId: string
}

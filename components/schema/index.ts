import { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export const prisma = new PrismaClient()

export type EmailQueueData = {
  email: string
  subject: string
  template: string
  data: Record<string, any>
}

export type OrderCancelQueueData = {
  orderId: string
}

export type { Decimal } from '@prisma/client/runtime/library'
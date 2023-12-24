import { PrismaClient } from '@prisma/client'
import { readReplicas } from '@prisma/extension-read-replicas'

export const prisma = new PrismaClient().$extends(
  readReplicas({
    url: JSON.parse(Bun.env.DATABASE_REPLICA_URLS as string),
  }),
)

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

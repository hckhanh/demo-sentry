import { PrismaClient } from '@prisma/client'
import { readReplicas } from '@prisma/extension-read-replicas'

function initPrismaClient() {
  if (Bun.env.NODE_ENV === 'production') {
    return new PrismaClient().$extends(
      readReplicas({
        url: JSON.parse(process.env.DATABASE_REPLICA_URLS as string),
      }),
    )
  }

  return new PrismaClient()
}

export const prisma = initPrismaClient()

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

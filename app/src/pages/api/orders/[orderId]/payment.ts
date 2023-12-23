import type { APIRoute } from 'astro'

import { emailQueue, orderCancelQueue } from 'app-old/app/queues.ts'
import { cardSchema } from 'app-old/app/routes/_store.orders.$orderId/schemas.ts'
import { formatCurrency, formatPercent } from 'app-old/app/utils.ts'
import cardValidator from 'card-validator'
import { format } from 'date-fns'
import { prisma } from 'schema'
import { flatten, safeParse } from 'valibot'

export const POST: APIRoute = async ({ params, request }) => {
  const { orderId } = params

  if (!orderId) {
    return new Response('Invalid url', { status: 400 })
  }

  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())

  const parsed = safeParse(cardSchema, data)

  if (!parsed.success) {
    return new Response(JSON.stringify(flatten(parsed.issues)), { status: 422 })
  }

  const count = await prisma.order.count({
    where: { id: orderId, status: 'CREATED' },
  })

  if (count === 0) {
    return new Response('Order not found', {
      status: 404,
    })
  }

  const paymentMethod = cardValidator.number(parsed.data.cardNumber).card

  if (!paymentMethod) {
    return new Response('Invalid payment method', {
      status: 422,
    })
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'SUCCESS',
      paymentMethod: paymentMethod.niceType,
    },
    select: {
      email: true,
      total: true,
      taxes: true,
      taxRate: true,
      createdAt: true,
      paymentMethod: true,
      items: {
        select: {
          price: true,
          quantity: true,
          product: { select: { name: true } },
        },
      },
    },
  })

  await Promise.all([
    orderCancelQueue.remove(`order-cancel-${orderId}`),
    emailQueue.remove(`order-reminder-${orderId}`),
    emailQueue.add(`order-receipt-${orderId}`, {
      email: order.email,
      template: 'order-receipt',
      subject: 'Your Purchase Confirmation',
      data: {
        orderId,
        email: order.email,
        paymentMethod: order.paymentMethod,
        total: formatCurrency(order.total),
        taxes: formatCurrency(order.taxes),
        taxRate: formatPercent(order.taxRate),
        purchasedAt: format(order.createdAt, 'MMMM dd, yyyy'),
        items: order.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: formatCurrency(item.price),
        })),
      },
    }),
  ])

  return new Response(null, { status: 204 })
}

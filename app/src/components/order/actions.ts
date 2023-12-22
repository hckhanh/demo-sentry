import { emailQueue, orderCancelQueue } from '~/queues'
import { formatCurrency, formatPercent } from '~/utils'
import { prisma } from 'schema'

type Address = {
  lastName: string
  firstName: string
  phone: string
  postalCode: string
  addressLevel1: string
  stressAddress: string
  addressLevel4: string
  addressLevel3: string
  addressLevel2: string
}

type Order = {
  email: string
  quantity: number
  productId: string
  billingAddress: Address
  shippingAddress: Address
}

const TAX_RATE = 0.029

export async function createOrder(data: Order) {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: data.productId },
    select: { name: true, price: true },
  })

  const subtotal = product.price.times(data.quantity)
  const taxes = subtotal.times(TAX_RATE)
  const total = subtotal.plus(taxes)

  const [, order] = await prisma.$transaction([
    prisma.product.update({
      select: { id: true },
      where: { id: data.productId },
      data: { remainQuantity: { decrement: data.quantity } },
    }),
    prisma.order.create({
      select: { id: true },
      data: {
        taxes,
        total,
        subtotal,
        shippingFee: 0,
        taxRate: 0.029,

        email: data.email,

        assessment: {
          create: {
            fingerprintId: '',
            subFingerprintId: '',
            ipAddress: '127.0.0.1',
            assessmentId: Math.random().toString(32),
          },
        },

        items: {
          create: {
            price: product.price,
            quantity: data.quantity,
            productId: data.productId,
          },
        },

        billingAddress: {
          create: {
            lastName: data.billingAddress.lastName,
            firstName: data.billingAddress.firstName,
            phone: data.billingAddress.phone,
            postalCode: data.billingAddress.postalCode,
            addressLevel1: data.billingAddress.addressLevel1,
            stressAddress: data.billingAddress.stressAddress,
            addressLevel4: data.billingAddress.addressLevel4,
            addressLevel3: data.billingAddress.addressLevel3,
            addressLevel2: data.billingAddress.addressLevel2,
          },
        },

        shippingAddress: {
          create: {
            lastName: data.shippingAddress.lastName,
            firstName: data.shippingAddress.firstName,
            phone: data.shippingAddress.phone,
            postalCode: data.shippingAddress.postalCode,
            addressLevel1: data.shippingAddress.addressLevel1,
            stressAddress: data.shippingAddress.stressAddress,
            addressLevel4: data.shippingAddress.addressLevel4,
            addressLevel3: data.shippingAddress.addressLevel3,
            addressLevel2: data.shippingAddress.addressLevel2,
          },
        },
      },
    }),
  ])

  await Promise.all([
    emailQueue.add(
      `order-reminder-${order.id}`,
      {
        email: data.email,
        template: 'order-reminder',
        subject: 'Your Awaiting Order',
        data: {
          billingFirstName: data.billingAddress.firstName,
          orderId: order.id,
          email: data.email,
          total: formatCurrency(total),
          taxes: formatCurrency(taxes),
          taxRate: formatPercent(TAX_RATE),
          paymentLink: `${import.meta.env.APP_URL}/orders/${order.id}`,
          items: [
            {
              name: product.name,
              quantity: data.quantity,
              price: formatCurrency(product.price),
            },
          ],
        },
      },
      { delay: 1000 * 60 * 30 },
    ),
    orderCancelQueue.add(
      `order-cancel-${order.id}`,
      { orderId: order.id },
      { delay: 1000 * 60 * 60 * 24 },
    ),
  ])

  return order.id
}

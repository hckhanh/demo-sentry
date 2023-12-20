import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import Breadcrumb from '~/components/Breadcrumb'
import { emailQueue, orderCancelQueue } from '~/queues'
import OrderPayNow from '~/routes/_store.orders.$orderId/OrderPayNow'
import PaymentInformation from '~/routes/_store.orders.$orderId/PaymentInformation'
import { cardSchema } from '~/routes/_store.orders.$orderId/schemas'
import { formatCurrency, formatPercent } from '~/utils'
import { format } from 'date-fns'
import { prisma } from 'schema'
import { flatten, safeParse } from 'valibot'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
    include: { items: { include: { product: true } } },
  })

  if (order.status !== 'CREATED') {
    return redirect(`/orders/${order.id}/result`)
  }

  return json(order)
}

export default function OrderDetails() {
  const order = useLoaderData<typeof loader>()

  return (
    <Form
      method='POST'
      className='gap-8 lg:grid lg:grid-cols-12'
    >
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order {order.id}</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
        <PaymentInformation />
      </div>
      <div className='col-span-5 row-span-2 space-y-6'>
        <h2 className='text-lg font-medium leading-7'>Order summary</h2>
        <OrderPayNow
          total={order.total}
          taxes={order.taxes}
          taxRate={order.taxRate}
          subtotal={order.subtotal}
          price={order.items[0].price}
          shippingFee={order.shippingFee}
          name={order.items[0].product.name}
          quantity={order.items[0].quantity}
          image={order.items[0].product.image}
        />
      </div>
    </Form>
  )
}

export async function action({ params, request }: ActionFunctionArgs) {
  if (!params.orderId) {
    return json('Invalid url', 400)
  }

  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())

  const parsed = safeParse(cardSchema, data)

  if (!parsed.success) {
    return json(flatten(parsed.issues), 422)
  }

  const order = await prisma.order.update({
    where: { id: params.orderId },
    data: {
      status: 'SUCCESS',
    },
    include: { items: { include: { product: true } } },
  })

  await Promise.all([
    orderCancelQueue.remove(`order-cancel-${params.orderId}`),
    emailQueue.remove(`order-reminder-${params.orderId}`),
    emailQueue.add(`order-receipt-${params.orderId}`, {
      email: order.email,
      template: 'order-receipt',
      subject: 'Your Purchase Confirmation',
      data: {
        email: order.email,
        orderId: params.orderId,
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

  return redirect(`/orders/${params.orderId}/result`)
}

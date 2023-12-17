import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import Breadcrumb from '~/components/Breadcrumb'
import prisma from '~/prisma.server'
import OrderPayNow from '~/routes/_store.orders.$orderId/OrderPayNow'
import PaymentInformation from '~/routes/_store.orders.$orderId/PaymentInformation'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
  })

  return json(order)
}

export default function OrderDetails() {
  const order = useLoaderData<typeof loader>()

  return (
    <Form className='gap-8 lg:grid lg:grid-cols-12'>
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order {order.id}</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
        <PaymentInformation />
      </div>
      <div className='col-span-5 row-span-2 space-y-6'>
        <h2 className='text-lg font-medium leading-7'>Order summary</h2>
        <OrderPayNow />
      </div>
    </Form>
  )
}

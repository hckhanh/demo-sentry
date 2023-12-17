import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Breadcrumb from '~/components/Breadcrumb'
import prisma from '~/prisma.server'
import CanceledOrder from '~/routes/_store.orders_.$orderId.result/CanceledOrder'
import SuccessOrder from '~/routes/_store.orders_.$orderId.result/SuccessOrder'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
  })

  if (order.status === 'CREATED') {
    return redirect(`/orders/${order.id}`)
  }

  return json(order)
}

export default function OrderResult() {
  const order = useLoaderData<typeof loader>()

  return (
    <main className='gap-8 lg:grid lg:grid-cols-12'>
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order result</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <div className='col-span-full mx-auto flex max-w-[33.75rem] flex-col text-center'>
        {order.status === 'CANCELED' ? (
          <CanceledOrder orderId={order.id} />
        ) : (
          <SuccessOrder orderId={order.id} />
        )}
      </div>
    </main>
  )
}

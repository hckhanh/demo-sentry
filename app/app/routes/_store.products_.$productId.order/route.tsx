import OrderSummary from '~/routes/_store.products_.$productId.order/OrderSummary'
import PersonalInformation from '~/routes/_store.products_.$productId.order/PersonalInformation'
import Breadcrumb from '~/components/Breadcrumb'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import prisma from '~/prisma'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: params.productId },
  })

  return json(product)
}

export default function OrderConfirmation() {
  const product = useLoaderData<typeof loader>()

  return (
    <div className='gap-8 diagonal-fractions lg:grid lg:grid-cols-12'>
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item link='..'>{product.name}</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
        <PersonalInformation />
      </div>
      <div className='col-span-5 row-span-2 space-y-6'>
        <div className='text-lg font-medium leading-7'>Order summary</div>
        <OrderSummary
          image={product.image}
          id={product.id}
          name={product.name}
          price={product.price}
          maxQuantity={product.quantity}
        />
      </div>
    </div>
  )
}

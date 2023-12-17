import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import Breadcrumb from '~/components/Breadcrumb'
import Button from '~/components/form/Button'
import prisma from '~/prisma.server'
import { formatCurrency } from '~/utils'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: params.productId },
  })

  return json(product)
}

export default function Product() {
  const product = useLoaderData<typeof loader>()

  return (
    <div className='gap-8 diagonal-fractions lg:grid lg:grid-cols-12'>
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>{product.name}</Breadcrumb.ItemCurrent>
      </Breadcrumb>
      <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
        <img
          alt={product.name}
          src={product.image}
          className='product-image aspect-1 sticky top-4 rounded-2xl'
        />
      </div>
      <div className='col-span-5 mt-8 flex flex-col gap-6 lg:mt-0'>
        <div>
          <div className='product-title text-3xl font-medium text-gray-900'>
            {product.name}
          </div>
          <div className='product-price text-xl font-medium text-gray-900'>
            {formatCurrency(product.price)}
          </div>
        </div>

        <div className='text-gray-500'>{product.introduction}</div>

        {product.remainQuantity > 0 ? (
          <NavLink unstable_viewTransition to='./order' prefetch='intent'>
            {({ isPending }) => (
              <Button className='w-full' loading={isPending}>
                Buy now
              </Button>
            )}
          </NavLink>
        ) : (
          <Button disabled className='w-full'>
            Out of stock
          </Button>
        )}

        <div>
          <div className='text-lg font-medium text-gray-900'>Highlights</div>
          <ul className='mt-4 list-inside list-disc pl-2 text-gray-500'>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className='text-lg font-medium text-gray-900'>Description</div>
          <div className='mt-4 text-gray-500'>
            {product.descriptions.map((description) => (
              <p className='mt-4' key={description}>
                {description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

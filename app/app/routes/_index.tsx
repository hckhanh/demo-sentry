import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ProductLink from '~/components/product/ProductLink'
import { prisma } from 'schema'

export async function loader() {
  const products = await prisma.product.findMany({ take: 10 })
  console.log(products)
  
  return json(products)
}

export default function IndexForm() {
  const products = useLoaderData<typeof loader>()

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <ProductLink
              key={product.id}
              product={product}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

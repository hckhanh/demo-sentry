import { memo } from 'react'

import { Link } from '@remix-run/react'
import ProductImage from '~/components/product/ProductImage'
import { formatCurrency } from '~/utils'

type ProductLinkProps = {
  link: string
  product: {
    name: string
    image: string
    price: string
  }
}

function ProductLink({ link, product }: ProductLinkProps) {
  return (
    <Link
      unstable_viewTransition
      to={link}
      prefetch='intent'
      className='group'
    >
      <div className='aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200'>
        <ProductImage
          link={link}
          name={product.name}
          image={product.image}
        />
      </div>
      <h3 className='mt-4 text-sm text-gray-700'>{product.name}</h3>
      <p className='mt-1 text-lg font-medium slashed-zero text-gray-900'>
        {formatCurrency(product.price)}
      </p>
    </Link>
  )
}

export default memo(ProductLink)

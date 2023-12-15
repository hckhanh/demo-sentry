import { unstable_useViewTransitionState } from '@remix-run/react'
import clsx from 'clsx'

type ProductImageProps = {
  link: string
  name: string
  image: string
}

export default function ProductImage({ link, image, name }: ProductImageProps) {
  const isViewTransition = unstable_useViewTransitionState(link)

  return (
    <img
      src={image}
      alt={name}
      className={clsx(
        'h-full w-full object-cover object-center group-hover:opacity-75',
        isViewTransition && 'product-image',
      )}
    />
  )
}

import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { prisma } from 'schema'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const product = await prisma.product.findUniqueOrThrow({
    select: { price: true },
    where: { id: params.productId },
  })

  const quantity = Number(searchParams.get('quantity') ?? 1)
  const subtotal = product.price.times(quantity)
  const tax = subtotal.times(0.029)

  return json({
    tax,
    subtotal,
    taxRate: 0.029,
    unitPrice: product.price,
    total: subtotal.add(tax),
  })
}

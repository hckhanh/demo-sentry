import type { APIRoute } from 'astro'

import { prisma } from 'schema'

export const GET: APIRoute = async ({ params, request }) => {
  const searchParams = new URL(request.url).searchParams
  const product = await prisma.product.findUniqueOrThrow({
    select: { price: true },
    where: { id: params.productId as string },
  })

  const quantity = Number(searchParams.get('quantity') ?? 1)
  const subtotal = product.price.times(quantity)
  const tax = subtotal.times(0.029)

  return new Response(
    JSON.stringify({
      tax,
      subtotal,
      taxRate: 0.029,
      unitPrice: product.price,
      total: subtotal.add(tax),
    }),
    { status: 200 },
  )
}

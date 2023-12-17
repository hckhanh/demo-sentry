import prisma from '~/prisma'

export async function calculateTotal(productId: string, quantity: number) {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  })

  const subtotal = product.price.times(quantity)
  const tax = subtotal.times(0.029)

  return subtotal.plus(tax)
}

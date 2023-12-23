import type { APIRoute } from 'astro'

import { createOrder } from '~/components/order/actions.ts'
import { defaultOrderSchema, fullOrderSchema } from '~/schemas.ts'
import { flatten, safeParse } from 'valibot'

export const POST: APIRoute = async ({ params, request }) => {
  const { productId } = params

  if (!productId) {
    return new Response('Product not found', { status: 404 })
  }

  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())

  if (formData.has('sameAsShipping')) {
    const parsed = safeParse(defaultOrderSchema, data, {
      abortPipeEarly: true,
    })

    if (!parsed.success) {
      return new Response(JSON.stringify(flatten(parsed.issues)), {
        status: 422,
      })
    }

    const orderId = await createOrder({
      productId,
      email: parsed.output.email,
      quantity: parsed.output.quantity,
      billingAddress: {
        lastName: parsed.output.shippingLastName,
        firstName: parsed.output.shippingFirstName,
        addressLevel1: '',
        phone: parsed.output.shippingPhone,
        postalCode: parsed.output.shippingPostalCode,
        stressAddress: parsed.output.shippingStreetAddress,
        addressLevel4: parsed.output.shippingAddressLevel4,
        addressLevel3: parsed.output.shippingAddressLevel3,
        addressLevel2: parsed.output.shippingAddressLevel2,
      },
      shippingAddress: {
        lastName: parsed.output.shippingLastName,
        firstName: parsed.output.shippingFirstName,
        addressLevel1: '',
        phone: parsed.output.shippingPhone,
        postalCode: parsed.output.shippingPostalCode,
        stressAddress: parsed.output.shippingStreetAddress,
        addressLevel4: parsed.output.shippingAddressLevel4,
        addressLevel3: parsed.output.shippingAddressLevel3,
        addressLevel2: parsed.output.shippingAddressLevel2,
      },
    })

    return new Response(JSON.stringify({ orderId }), { status: 201 })
  } else {
    const parsed = safeParse(fullOrderSchema, data, {
      abortPipeEarly: true,
    })

    if (!parsed.success) {
      return new Response(JSON.stringify(flatten(parsed.issues)), {
        status: 422,
      })
    }

    const orderId = await createOrder({
      productId,
      email: parsed.output.email,
      quantity: parsed.output.quantity,
      billingAddress: {
        lastName: parsed.output.billingLastName,
        firstName: parsed.output.billingFirstName,
        addressLevel1: '',
        phone: parsed.output.billingPhone,
        postalCode: parsed.output.billingPostalCode,
        stressAddress: parsed.output.billingStreetAddress,
        addressLevel4: parsed.output.billingAddressLevel4,
        addressLevel3: parsed.output.billingAddressLevel3,
        addressLevel2: parsed.output.billingAddressLevel2,
      },
      shippingAddress: {
        lastName: parsed.output.shippingLastName,
        firstName: parsed.output.shippingFirstName,
        addressLevel1: '',
        phone: parsed.output.shippingPhone,
        postalCode: parsed.output.shippingPostalCode,
        stressAddress: parsed.output.shippingStreetAddress,
        addressLevel4: parsed.output.shippingAddressLevel4,
        addressLevel3: parsed.output.shippingAddressLevel3,
        addressLevel2: parsed.output.shippingAddressLevel2,
      },
    })

    return new Response(JSON.stringify({ orderId }), { status: 201 })
  }
}

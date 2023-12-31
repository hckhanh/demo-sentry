import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'

import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import Breadcrumb from '~/components/Breadcrumb'
import OrderSummary from '~/routes/_store.products_.$productId.order/OrderSummary'
import PersonalInformation from '~/routes/_store.products_.$productId.order/PersonalInformation'
import {
  defaultOrderSchema,
  fullOrderSchema,
} from '~/routes/_store.products_.$productId.order/schemas'
import { createOrder } from '~/routes/_store.products_.$productId.order/utils'
import { prisma } from 'schema'
import { flatten, safeParse } from 'valibot'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: params.productId },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      quantity: true,
      remainQuantity: true,
    },
  })

  if (product.remainQuantity === 0) {
    return redirect(`/products/${product.id}`)
  }

  return json(product)
}

export default function OrderConfirmation() {
  const product = useLoaderData<typeof loader>()

  return (
    <Form
      method='POST'
      className='gap-8 diagonal-fractions lg:grid lg:grid-cols-12'
    >
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
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          maxQuantity={product.quantity}
        />
      </div>
    </Form>
  )
}

export async function action({ params, request }: ActionFunctionArgs) {
  if (!params.productId) {
    return json('Invalid url', 400)
  }

  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())

  if (formData.has('sameAsShipping')) {
    const parsed = safeParse(defaultOrderSchema, data, {
      abortPipeEarly: true,
    })

    if (!parsed.success) {
      return json(flatten(parsed.issues), 422)
    }

    const orderId = await createOrder({
      email: parsed.output.email,
      productId: params.productId,
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

    return redirect(`/orders/${orderId}`)
  } else {
    const parsed = safeParse(fullOrderSchema, data, {
      abortPipeEarly: true,
    })

    if (!parsed.success) {
      return json(flatten(parsed.issues), 422)
    }

    const orderId = await createOrder({
      email: parsed.output.email,
      productId: params.productId,
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

    return redirect(`/orders/${orderId}`)
  }
}

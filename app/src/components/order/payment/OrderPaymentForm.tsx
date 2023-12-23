import { useState } from 'react'

import type { FlatErrors } from 'valibot'

import FormValidation from '~/components/form/FormValidation'
import Breadcrumb from '~/components/header/Breadcrumb'
import OrderPayNow from '~/components/order/payment/OrderPayNow'
import PaymentInformation from '~/components/order/payment/PaymentInformation'

type OrderPaymentFormProps = {
  order: {
    id: string
    total: string
    taxes: string
    taxRate: number
    subtotal: string
    shippingFee: string
    items: {
      price: string
      quantity: number
      product: {
        name: string
        image: string
      }
    }[]
  }
}

export default function OrderPaymentForm({ order }: OrderPaymentFormProps) {
  const [errors, setErrors] = useState<FlatErrors>({ nested: {} })
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch(`/api/orders/${order.id}/payment`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      window.location.assign(`/orders/${data.orderId}/result`)
    } else if (response.status === 422) {
      setErrors(data)
    }

    setLoading(false)
  }

  return (
    <form
      method='POST'
      onSubmit={submit}
      className='gap-8 lg:grid lg:grid-cols-12'
    >
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order {order.id}</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <FormValidation errors={errors}>
        <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
          <PaymentInformation />
        </div>

        <div className='col-span-5 row-span-2 space-y-6'>
          <h2 className='text-lg font-medium leading-7'>Order summary</h2>
          {order.items[0] && (
            <OrderPayNow
              loading={loading}
              total={order.total}
              taxes={order.taxes}
              taxRate={order.taxRate}
              subtotal={order.subtotal}
              price={order.items[0].price}
              shippingFee={order.shippingFee}
              name={order.items[0].product.name}
              quantity={order.items[0].quantity}
              image={order.items[0].product.image}
            />
          )}
        </div>
      </FormValidation>
    </form>
  )
}

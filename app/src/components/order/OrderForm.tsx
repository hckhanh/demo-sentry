import { useState } from 'react'

import type { FlatErrors } from 'valibot'

import FormValidation from '~/components/form/FormValidation.tsx'
import Breadcrumb from '~/components/header/Breadcrumb'
import OrderSummary from '~/components/order/OrderSummary'
import PersonalInformation from '~/components/order/PersonalInformation'

type OrderFormProps = {
  product: {
    id: string
    name: string
    image: string
    price: string
    quantity: number
  }
}

export default function OrderForm({ product }: OrderFormProps) {
  const [errors, setErrors] = useState<FlatErrors>({ nested: {} })
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch(`/api/products/${product.id}/order`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      window.location.assign(`/orders/${data.orderId}`)
    } else if (response.status === 422) {
      setErrors(data)
      setLoading(false)
    }
  }

  return (
    <form
      method='POST'
      onSubmit={submit}
      className='gap-8 diagonal-fractions lg:grid lg:grid-cols-12'
    >
      <Breadcrumb className='col-span-full col-start-2 mb-8 lg:mb-0 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item link={`/products/${product.id}`}>
          {product.name}
        </Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <FormValidation errors={errors}>
        <div className='col-span-5 col-start-2 row-span-2 2xl:col-span-7 2xl:col-start-1'>
          <PersonalInformation />
        </div>

        <div className='col-span-5 row-span-2 space-y-6'>
          <div className='text-lg font-medium leading-7'>Order summary</div>
          <OrderSummary
            id={product.id}
            loading={loading}
            name={product.name}
            image={product.image}
            price={product.price}
            maxQuantity={product.quantity}
          />
        </div>
      </FormValidation>
    </form>
  )
}

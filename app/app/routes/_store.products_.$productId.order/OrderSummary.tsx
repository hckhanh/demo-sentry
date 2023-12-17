import { useEffect, useState } from 'react'

import { useNavigation } from '@remix-run/react'
import Skeleton from '~/components/Skeleton'
import Button from '~/components/form/Button'
import CounterInput from '~/components/form/CounterInput'
import useDebounce from '~/hooks/useDebounce'
import { formatCurrency, formatPercent } from '~/utils'

type OrderSummaryProps = {
  id: string
  name: string
  image: string
  maxQuantity: number
  price: number | string
}

type Price = {
  tax: string
  total: string
  taxRate: number
  subtotal: string
}

export default function OrderSummary({
  id,
  name,
  image,
  maxQuantity,
  price: unitPrice,
}: OrderSummaryProps) {
  const [price, setPrice] = useState<Price>()
  const [quantity, setQuantity] = useState(1)
  const debouncedQuantity = useDebounce(quantity, 300)
  const navigation = useNavigation()

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/products/${id}/order/price?quantity=${debouncedQuantity}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setPrice(data)
      })

    return () => {
      controller.abort()
    }
  }, [id, debouncedQuantity])

  return (
    <div className='sticky top-4 rounded-lg border shadow-sm'>
      <div className='flex gap-6 p-6'>
        <img
          alt={name}
          src={image}
          className='product-image h-[7.5rem] w-20 rounded-md object-cover object-center'
        />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='product-title font-medium text-gray-700'>{name}</div>
          <div className='flex items-center justify-between'>
            <CounterInput
              min={1}
              size={3}
              maxLength={3}
              name='quantity'
              value={quantity}
              max={maxQuantity}
              onValueChange={setQuantity}
            />
            <div className='product-price font-medium'>
              {formatCurrency(unitPrice)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='space-y-6 p-6'>
        <div className='flex justify-between'>
          <div>Subtotal</div>
          <Skeleton loading={!price} className='w-10'>
            <div>{price && formatCurrency(price.subtotal)}</div>
          </Skeleton>
        </div>
        <div className='flex justify-between'>
          <div>Shipping</div>
          <div>Free</div>
        </div>
        <div className='flex justify-between'>
          <div>Taxes {price && `(${formatPercent(price.taxRate)})`}</div>
          <Skeleton loading={!price} className='w-10'>
            <div>{price && formatCurrency(price.tax)}</div>
          </Skeleton>
        </div>
        <hr />
        <div className='flex justify-between text-base'>
          <div>Total</div>
          <Skeleton loading={!price} className='w-10'>
            <div>{price && formatCurrency(price.total)}</div>
          </Skeleton>
        </div>
      </div>
      <hr />
      <div className='p-6'>
        <Button
          type='submit'
          className='w-full'
          loading={navigation.state === 'submitting'}
        >
          Confirm order
        </Button>
      </div>
    </div>
  )
}

import Button from '~/components/form/Button'
import CounterInput from '~/components/form/CounterInput'
import { Link } from '@remix-run/react'
import { formatCurrency, formatPercent } from '~/utils'
import { useEffect, useState } from 'react'
import Skeleton from '~/components/Skeleton'
import useDebounce from '~/hooks/useDebounce'

type OrderSummaryProps = {
  id: string
  name: string
  image: string
  price: string | number
  maxQuantity: number
}

type Price = {
  subtotal: string
  tax: string
  taxRate: number
  total: string
}

export default function OrderSummary({
  id,
  name,
  maxQuantity,
  image,
  price: unitPrice,
}: OrderSummaryProps) {
  const [price, setPrice] = useState<Price>()
  const [quantity, setQuantity] = useState(1)
  const debouncedQuantity = useDebounce(quantity, 300)

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
          className='product-image h-[7.5rem] w-20 rounded-md object-cover object-center'
          src={image}
        />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='product-title font-medium text-gray-700'>{name}</div>
          <div className='flex items-center justify-between'>
            <CounterInput
              size={3}
              max={maxQuantity}
              min={1}
              maxLength={3}
              value={quantity}
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
          <div>FREE</div>
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
        <Link to='./order'>
          <Button type='button' className='w-full'>
            Confirm order
          </Button>
        </Link>
      </div>
    </div>
  )
}

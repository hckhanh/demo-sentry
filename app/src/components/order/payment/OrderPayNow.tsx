import Button from '~/components/form/Button.tsx'
import { formatCurrency, formatPercent } from '~/utils.ts'

type OrderPayNowProps = {
  name: string
  image: string
  price: string
  taxes: string
  total: string
  taxRate: number
  quantity: number
  subtotal: string
  shippingFee: string
  loading?: boolean | undefined
}

export default function OrderPayNow({
  name,
  image,
  price,
  taxes,
  total,
  taxRate,
  loading,
  quantity,
  subtotal,
  shippingFee,
}: OrderPayNowProps) {
  return (
    <div className='sticky top-4 rounded-lg border shadow-sm'>
      <div className='flex gap-6 p-6'>
        <img
          alt={name}
          src={image}
          className='h-[7.5rem] w-20 rounded-md object-cover object-center'
        />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='font-medium text-gray-700'>{name}</div>
          <div className='flex justify-end'>
            <div className='font-medium'>
              {quantity} × {formatCurrency(price)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='space-y-6 p-6'>
        <div className='flex justify-between'>
          <div>Subtotal</div>
          <div>{formatCurrency(subtotal)}</div>
        </div>
        <div className='flex justify-between'>
          <div>Shipping</div>
          <div>{formatCurrency(shippingFee)}</div>
        </div>
        <div className='flex justify-between'>
          <div>Taxes ({formatPercent(taxRate)})</div>
          <div>{formatCurrency(taxes)}</div>
        </div>
        <hr />
        <div className='flex justify-between text-base'>
          <div>Total</div>
          <div>{formatCurrency(total)}</div>
        </div>
      </div>
      <hr />
      <div className='p-6'>
        <Button type='submit' loading={loading} className='w-full'>
          Pay now
        </Button>
      </div>
    </div>
  )
}

import Button from '~/components/form/Button'

export default function OrderPayNow() {
  return (
    <div className='sticky top-4 rounded-lg border shadow-sm'>
      <div className='flex gap-6 p-6'>
        <img
          className='h-[7.5rem] w-20 rounded-md object-cover object-center'
          src='https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'
        />
        <div className='flex flex-1 flex-col justify-between'>
          <div className='font-medium text-gray-700'>Nomad Tumbler</div>
          <div className='flex justify-between'>
            <div>1</div>
            <div className='font-medium'>$32.00</div>
          </div>
        </div>
      </div>
      <hr />
      <div className='space-y-6 p-6'>
        <div className='flex justify-between'>
          <div>Subtotal</div>
          <div>$64.00</div>
        </div>
        <div className='flex justify-between'>
          <div>Shipping</div>
          <div>$64.00</div>
        </div>
        <div className='flex justify-between'>
          <div>Taxes</div>
          <div>$64.00</div>
        </div>
        <hr />
        <div className='flex justify-between text-base'>
          <div>Total</div>
          <div>$64.00</div>
        </div>
      </div>
      <hr />
      <div className='p-6'>
        <Button type='submit' className='w-full'>
          Pay now
        </Button>
      </div>
    </div>
  )
}

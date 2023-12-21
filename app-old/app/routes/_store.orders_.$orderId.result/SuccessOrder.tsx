import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@remix-run/react'

type SuccessOrderProps = {
  orderId: string
}

export default function SuccessOrder({ orderId }: SuccessOrderProps) {
  return (
    <>
      <FontAwesomeIcon
        size='4x'
        width={56}
        height={56}
        icon={faCircleCheck}
        className='h-14 w-14 place-self-center text-green-500'
      />
      <p className='mt-4 text-2xl font-semibold text-indigo-600'>
        Payment successful!
      </p>
      <p className='text-balance mt-2 max-w-md text-base leading-7 text-gray-600'>
        Thank you for your order. We will send you a confirmation email shortly.
      </p>
      <div className='mt-8 text-lg font-bold text-gray-900 sm:text-xl'>
        Order number:
      </div>
      <div className='mt-2 text-xl font-bold sm:text-2xl'>{orderId}</div>
      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <Link
          unstable_viewTransition
          to='/'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Go back home
        </Link>
      </div>
    </>
  )
}

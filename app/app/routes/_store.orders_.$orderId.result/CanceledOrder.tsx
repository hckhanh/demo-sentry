import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@remix-run/react'

type CanceledOrderProps = {
  orderId: string
}

export default function CanceledOrder({ orderId }: CanceledOrderProps) {
  return (
    <>
      <FontAwesomeIcon
        size='4x'
        width={56}
        height={56}
        icon={faCircleExclamation}
        className='h-14 w-14 place-self-center text-red-500'
      />
      <p className='mt-4 text-2xl font-semibold text-indigo-600'>
        Order canceled!
      </p>
      <p className='text-balance mx-auto mt-2 max-w-md text-base leading-7 text-gray-600'>
        Sorry, your order was canceled. Regularly, an order will be canceled in
        one of the following cases:
      </p>
      <ul className='mx-auto mt-4 list-inside list-disc rounded-md border border-red-500 bg-red-50 px-6 py-4 text-left shadow-sm'>
        <li>
          You did not finish the order within 24 hours after receiving order
          confirmation email.
        </li>
        <li>Maybe, you are a bot ;)</li>
        <li>
          There are some activities (scalping, skewing and scraping) are related
          to this order.
        </li>
      </ul>
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

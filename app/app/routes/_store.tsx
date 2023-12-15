import { Outlet } from '@remix-run/react'

export default function Store() {
  return (
    <div className='mx-auto my-8 max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
      <Outlet />
    </div>
  )
}

import { Link } from '@remix-run/react'

type BreadcrumbProps = {
  className?: string
  children?: React.ReactNode
}

export default function Breadcrumb({ className, children }: BreadcrumbProps) {
  return (
    <nav aria-label='Breadcrumb' className={className}>
      <ol className='flex items-center space-x-2'>{children}</ol>
    </nav>
  )
}

type BreadcrumbItemProps = {
  link: string
  children: React.ReactNode
}

function BreadcrumbItem({ link, children }: BreadcrumbItemProps) {
  return (
    <li>
      <div className='flex items-center'>
        <Link
          to={link}
          relative='path'
          prefetch='intent'
          className='mr-2 text-sm font-medium text-gray-900'
          unstable_viewTransition
        >
          {children}
        </Link>
        <svg
          width={16}
          height={20}
          viewBox='0 0 16 20'
          fill='currentColor'
          aria-hidden='true'
          className='h-5 w-4 text-gray-300'
        >
          <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
        </svg>
      </div>
    </li>
  )
}

type BreadcrumbItemCurrentProps = {
  children?: React.ReactNode
}

function BreadcrumbItemCurrent({ children }: BreadcrumbItemCurrentProps) {
  return (
    <li className='text-sm'>
      <div aria-current='page' className='font-medium text-gray-500'>
        {children}
      </div>
    </li>
  )
}

Breadcrumb.Item = BreadcrumbItem
Breadcrumb.ItemCurrent = BreadcrumbItemCurrent

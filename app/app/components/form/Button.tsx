import clsx from 'clsx'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean
  noPadding?: boolean
  variant?: 'default' | 'outline'
}

export default function Button({
  className,
  loading,
  children,
  disabled,
  noPadding,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        'flex select-none items-center justify-center rounded-md border text-base font-medium focus:outline-none',
        {
          'px-8 py-3': !noPadding,
          'cursor-not-allowed': loading,
          'cursor-not-allowed bg-gray-100 text-gray-400': disabled,
          'hover:bg-indigo-50': variant === 'outline' && !(disabled || loading),
          'border-transparent bg-indigo-600 text-white':
            variant === 'default' && !disabled,
          'border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-50':
            variant === 'outline' && !disabled,
          'hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2':
            variant === 'default' && !(disabled || loading),
        },
        className,
      )}
    >
      {loading && (
        <svg
          fill='none'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
        >
          <circle
            r='10'
            cx='12'
            cy='12'
            strokeWidth='4'
            stroke='currentColor'
            className='opacity-25'
          ></circle>
          <path
            fill='currentColor'
            className='opacity-75'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}

import clsx from 'clsx'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'outline' | 'default'
  noPadding?: boolean
}

export default function Button({
  variant = 'default',
  className,
  children,
  noPadding,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center justify-center rounded-md border text-base font-medium focus:outline-none focus:ring-2',
        {
          'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2':
            variant === 'default' && !props.disabled,
          'border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-300':
            variant === 'outline' && !props.disabled,
          'px-8 py-3': !noPadding,
          'cursor-not-allowed bg-gray-100 text-gray-400': props.disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

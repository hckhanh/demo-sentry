import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
}

export default function TextInput({
  className,
  name,
  label,
  error,
  description,
  ...props
}: TextInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className='block text-sm font-medium leading-6 text-gray-700'
      >
        {label}
      </label>
      {description && !error && (
        <p className='mt-0 text-xs text-gray-500'>{description}</p>
      )}
      {error && (
        <p className='mt-0 flex items-center gap-x-1 text-xs text-red-500'>
          <XCircleIcon className='h-5 w-5 min-w-fit' width={20} height={20} />
          {error}
        </p>
      )}
      <div className='mt-1'>
        <input
          {...props}
          name={name}
          id={name}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  )
}

import clsx from 'clsx'

type TextInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
> & {
  label: React.ReactNode
  description?: React.ReactNode
}

export default function CheckboxInput({
  className,
  name,
  label,
  description,
  ...props
}: TextInputProps) {
  return (
    <div className={clsx('relative flex gap-x-3', className)}>
      <div className='flex h-6 items-center'>
        <input
          {...props}
          id={name}
          name={name}
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
        />
      </div>
      <div className='text-sm leading-6'>
        <label htmlFor={name} className='font-medium text-gray-900'>
          {label}
        </label>
        <p className='text-gray-500'>{description}</p>
      </div>
    </div>
  )
}

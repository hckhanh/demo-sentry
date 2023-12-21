import { useFieldError } from 'app/components/form/FormValidation'
import clsx from 'clsx'

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
}

export default function TextInput({
  className,
  name,
  label,
  description,
  ...props
}: TextInputProps) {
  const error = useFieldError(name)

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className='block text-sm font-medium leading-6 text-gray-700'
      >
        {label}
        {props.required && <span className='text-red-500'>&nbsp;*</span>}
      </label>
      <input
        {...props}
        id={name}
        name={name}
        className={clsx(
          'block w-full appearance-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          {
            'bg-red-50 ring-red-500 focus:ring-red-500': error,
          },
        )}
      />
      {description && !error && (
        <p className='mt-1 text-xs text-gray-500'>{description}</p>
      )}
      {error && (
        <p className='mt-1 flex items-center gap-x-1 text-xs text-red-500'>
          {error}
        </p>
      )}
    </div>
  )
}

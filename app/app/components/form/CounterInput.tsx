import { memo, useCallback } from 'react'

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/form/Button'

type CounterInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'onChange' | 'value'
> & {
  defaultValue?: number
  value?: number | string
  label?: React.ReactNode
  error?: React.ReactNode
  description?: React.ReactNode
  onValueChange?: React.Dispatch<React.SetStateAction<number>>
}

const MemoButton = memo(
  Button,
  (prevProps, nextProps) => prevProps.disabled === nextProps.disabled,
)

export default function CounterInput({
  className,
  min,
  max,
  name,
  label,
  error,
  value,
  description,
  defaultValue,
  onValueChange,
  ...props
}: CounterInputProps) {
  const decreaseValue = useCallback(() => {
    onValueChange?.((v) => {
      if (v > Number(min)) {
        return v - 1
      }

      return v
    })
  }, [min, onValueChange])

  const increaseValue = useCallback(() => {
    onValueChange?.((v) => {
      if (v < Number(max)) {
        return v + 1
      }

      return v
    })
  }, [max, onValueChange])

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.((v) => {
      const newValue = Number(e.target.value)

      if (Number(min) <= newValue && newValue <= Number(max)) {
        return newValue
      }

      return v
    })
  }

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium leading-6 text-gray-700'
        >
          {label}
        </label>
      )}
      <div className='inline-flex'>
        <MemoButton
          noPadding
          type='button'
          variant='outline'
          onClick={decreaseValue}
          disabled={value === min}
          className='h-9 w-9 rounded-r-none'
        >
          <FontAwesomeIcon
            size='1x'
            width={14}
            height={16}
            icon={faMinus}
            className='h-4 w-3.5'
          />
        </MemoButton>
        <input
          {...props}
          id={name}
          min={min}
          max={max}
          name={name}
          value={value}
          type='number'
          minLength={1}
          onChange={changeValue}
          className='z-10 block border border-x-0 border-gray-300 py-1 text-center text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6'
        />
        <MemoButton
          noPadding
          type='button'
          variant='outline'
          onClick={increaseValue}
          disabled={value === max}
          className='h-9 w-9 rounded-l-none'
        >
          <FontAwesomeIcon
            size='1x'
            width={14}
            height={16}
            icon={faPlus}
            className='h-4 w-3.5'
          />
        </MemoButton>
      </div>
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

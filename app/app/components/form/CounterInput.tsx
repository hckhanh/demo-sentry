import {
  MinusSmallIcon,
  PlusSmallIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import Button from '~/components/form/Button'
import React, { memo, useCallback } from 'react'
import clsx from 'clsx'

type CounterInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value' | 'onChange'
> & {
  value?: string | number
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  defaultValue?: number
  onValueChange?: React.Dispatch<React.SetStateAction<number>>
}

const MemoButton = memo(
  Button,
  (prevProps, nextProps) => prevProps.disabled === nextProps.disabled,
)

export default function CounterInput({
  className,
  name,
  label,
  error,
  description,
  defaultValue,
  min,
  max,
  value,
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
    <div className={clsx('', className)}>
      {(label || description || error) && (
        <div className='mb-1'>
          {label && (
            <label
              htmlFor={name}
              className='block text-sm font-medium leading-6 text-gray-700'
            >
              {label}
            </label>
          )}
          {description && !error && (
            <p className='text-xs text-gray-500'>{description}</p>
          )}
          {error && (
            <p className='flex items-center gap-x-1 text-xs text-red-500'>
              <XCircleIcon
                className='h-5 w-5 min-w-fit'
                width={20}
                height={20}
              />
              {error}
            </p>
          )}
        </div>
      )}
      <div className='inline-flex'>
        <MemoButton
          onClick={decreaseValue}
          noPadding
          disabled={value === min}
          variant='outline'
          type='button'
          className='h-9 w-9 rounded-r-none border-r-0'
        >
          <MinusSmallIcon width={24} height={24} />
        </MemoButton>
        <input
          {...props}
          name={name}
          id={name}
          value={value}
          onChange={changeValue}
          type='number'
          min={min}
          minLength={1}
          max={max}
          className='z-10 block border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <MemoButton
          onClick={increaseValue}
          noPadding
          variant='outline'
          type='button'
          disabled={value === max}
          className='h-9 w-9 rounded-l-none border-l-0'
        >
          <PlusSmallIcon width={24} height={24} />
        </MemoButton>
      </div>
    </div>
  )
}

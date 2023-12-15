import TextInput from '~/components/form/TextInput'
import CheckboxInput from '~/components/form/CheckboxInput'
import { useCallback, useState } from 'react'

export default function BillingInformation() {
  const [isShipping, setIsShipping] = useState(true)

  const handleIsShipping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsShipping(e.target.checked)
    },
    [],
  )

  return (
    <>
      <CheckboxInput
        checked={isShipping}
        onChange={handleIsShipping}
        className='col-span-full'
        label='Same as shipping information'
      />
      {!isShipping && (
        <>
          <div className='col-span-3 grid grid-cols-2 gap-x-4'>
            <TextInput
              type='text'
              autoComplete='given-name'
              label='First name'
            />
            <TextInput
              type='text'
              autoComplete='family-name'
              label='Last name'
            />
          </div>
          <TextInput
            className='col-span-full'
            type='text'
            label='Address'
            autoComplete='billing street-address'
          />
          <TextInput
            type='text'
            className='col-span-full'
            autoComplete='billing address-level4'
            label='Apartment, suite, etc.'
          />
          <TextInput
            type='text'
            autoComplete='billing address-level2'
            label='City'
          />
          <TextInput
            type='text'
            autoComplete='billing address-level3'
            label='State / Province'
          />
          <TextInput
            type='text'
            autoComplete='postal-code'
            label='Postal code'
          />
          <TextInput
            type='tel'
            autoComplete='tel'
            label='Phone'
            className='col-span-full'
          />
        </>
      )}
    </>
  )
}

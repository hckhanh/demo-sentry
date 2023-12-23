import { useCallback, useState } from 'react'

import CheckboxInput from '~/components/form/CheckboxInput'
import TextInput from '~/components/form/TextInput'

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
        name='sameAsShipping'
        className='col-span-full'
        onChange={handleIsShipping}
        label='Same as shipping information'
      />

      {!isShipping && (
        <>
          <TextInput
            required
            type='text'
            label='First name'
            className='col-span-3'
            name='billingFirstName'
            autoComplete='given-name'
          />
          <TextInput
            required
            type='text'
            label='Last name'
            className='col-span-3'
            name='billingLastName'
            autoComplete='family-name'
          />
          <TextInput
            required
            type='text'
            label='Address'
            className='col-span-full'
            name='billingStreetAddress'
            autoComplete='billing street-address'
          />
          <TextInput
            type='text'
            className='col-span-full'
            name='billingAddressLevel4'
            label='Apartment, suite, etc.'
            autoComplete='billing address-level4'
          />
          <TextInput
            required
            type='text'
            label='City'
            className='col-span-2'
            name='billingAddressLevel2'
            autoComplete='billing address-level2'
          />
          <TextInput
            required
            type='text'
            className='col-span-2'
            label='State / Province'
            name='billingAddressLevel3'
            autoComplete='billing address-level3'
          />
          <TextInput
            required
            type='text'
            label='Postal code'
            className='col-span-2'
            name='billingPostalCode'
            autoComplete='postal-code'
          />
          <TextInput
            required
            type='tel'
            label='Phone'
            autoComplete='tel'
            name='billingPhone'
            className='col-span-full'
          />
        </>
      )}
    </>
  )
}

import type { FlatErrors } from 'valibot'

import FormSection from '~/components/form/FormSection'
import FormValidation from '~/components/form/FormValidation'
import TextInput from '~/components/form/TextInput'
import BillingInformation from '~/components/order/BillingInformation.tsx'

type PersonalInformationProps = {
  errors: FlatErrors
}

export default function PersonalInformation({
  errors,
}: PersonalInformationProps) {
  return (
    <div className='flex flex-col gap-12'>
      <FormValidation errors={errors}>
        <FormSection title='Contact information'>
          <TextInput
            required
            type='email'
            name='email'
            autoComplete='email'
            label='Email address'
            className='col-span-full'
          />
        </FormSection>
        <FormSection title='Shipping information'>
          <TextInput
            required
            type='text'
            label='First name'
            className='col-span-3'
            name='shippingFirstName'
            autoComplete='given-name'
          />
          <TextInput
            required
            type='text'
            label='Last name'
            className='col-span-3'
            name='shippingLastName'
            autoComplete='family-name'
          />
          <TextInput
            required
            type='text'
            label='Address'
            className='col-span-full'
            name='shippingStreetAddress'
            autoComplete='shipping street-address'
          />
          <TextInput
            type='text'
            className='col-span-full'
            name='shippingAddressLevel4'
            label='Apartment, suite, etc.'
            autoComplete='shipping address-level4'
          />
          <TextInput
            required
            type='text'
            label='City'
            className='col-span-2'
            name='shippingAddressLevel2'
            autoComplete='shipping address-level2'
          />
          <TextInput
            required
            type='text'
            className='col-span-2'
            label='State / Province'
            name='shippingAddressLevel3'
            autoComplete='shipping address-level3'
          />
          <TextInput
            required
            type='text'
            label='Postal code'
            className='col-span-2'
            name='shippingPostalCode'
            autoComplete='postal-code'
          />
          <TextInput
            required
            type='tel'
            label='Phone'
            autoComplete='tel'
            name='shippingPhone'
            className='col-span-full'
          />
        </FormSection>
        <FormSection title='Billing information'>
          <BillingInformation errors={errors} />
        </FormSection>
      </FormValidation>
    </div>
  )
}

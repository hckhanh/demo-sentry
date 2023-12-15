import TextInput from '~/components/form/TextInput'
import FormSection from '~/components/form/FormSection'
import BillingInformation from '~/routes/_store.products_.$productId.order/BillingInformation'

export default function PersonalInformation() {
  return (
    <div className='flex flex-col gap-12'>
      <FormSection title='Contact information'>
        <TextInput
          className='col-span-full'
          type='email'
          autoComplete='email'
          label='Email address'
        />
      </FormSection>
      <FormSection title='Shipping information'>
        <div className='col-span-3 grid grid-cols-2 gap-x-4'>
          <TextInput type='text' autoComplete='given-name' label='First name' />
          <TextInput type='text' autoComplete='family-name' label='Last name' />
        </div>
        <TextInput
          className='col-span-full'
          type='text'
          label='Address'
          autoComplete='shipping street-address'
        />
        <TextInput
          type='text'
          className='col-span-full'
          autoComplete='shipping address-level4'
          label='Apartment, suite, etc.'
        />
        <TextInput
          type='text'
          autoComplete='shipping address-level2'
          label='City'
        />
        <TextInput
          type='text'
          autoComplete='shipping address-level3'
          label='State / Province'
        />
        <TextInput type='text' autoComplete='postal-code' label='Postal code' />
        <TextInput
          type='tel'
          autoComplete='tel'
          label='Phone'
          className='col-span-full'
        />
      </FormSection>
      <FormSection title='Billing information'>
        <BillingInformation />
      </FormSection>
    </div>
  )
}

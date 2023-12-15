import TextInput from '~/components/form/TextInput'
import FormSection from '~/components/form/FormSection'

export default function PaymentInformation() {
  return (
    <div className='flex flex-col gap-12'>
      <FormSection title='Payment details'>
        <TextInput
          className='col-span-full'
          type='text'
          autoComplete='cc-name'
          label='Name on card'
        />
        <TextInput
          className='col-span-full'
          type='text'
          autoComplete='cc-number'
          label='Card number'
        />
        <TextInput
          className='col-span-2'
          type='text'
          autoComplete='cc-exp'
          label='Expiration date (MM/YY)'
        />
        <TextInput
          className='col-span-1'
          type='password'
          autoComplete='cc-csc'
          label='CVC'
        />
      </FormSection>
    </div>
  )
}

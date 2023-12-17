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
          placeholder='01/25'
          pattern='^(0[1-9]|1[0-2])\/\d{2}$'
          label='Expiration date (MM/YY)'
        />
        <TextInput
          className='col-span-1'
          type='password'
          autoComplete='cc-csc'
          label='CVC'
          maxLength={3}
          size={3}
        />
      </FormSection>
    </div>
  )
}

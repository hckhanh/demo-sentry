import FormSection from '~/components/form/FormSection'
import TextInput from '~/components/form/TextInput'

export default function PaymentInformation() {
  return (
    <FormSection title='Payment details'>
      <TextInput
        required
        type='text'
        name='nameOnCard'
        label='Name on card'
        autoComplete='cc-name'
        className='col-span-full'
      />
      <TextInput
        required
        type='text'
        name='cardNumber'
        label='Card number'
        autoComplete='cc-number'
        className='col-span-full'
      />
      <TextInput
        required
        type='text'
        placeholder='01/25'
        autoComplete='cc-exp'
        name='cardExpiration'
        className='col-span-3'
        label='Expiration date (MM/YY)'
        pattern='^(0[1-9]|1[0-2])\/\d{2}$'
      />
      <TextInput
        required
        size={3}
        label='CVC'
        maxLength={3}
        name='cardCvc'
        type='password'
        autoComplete='cc-csc'
        className='col-span-1'
      />
    </FormSection>
  )
}

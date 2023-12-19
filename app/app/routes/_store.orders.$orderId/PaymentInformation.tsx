import FormSection from '~/components/form/FormSection'
import FormValidation from '~/components/form/FormValidation'
import TextInput from '~/components/form/TextInput'

export default function PaymentInformation() {
  return (
    <FormSection title='Payment details'>
      <FormValidation>
        <TextInput
          required
          type='text'
          name='cardHolderName'
          autoComplete='cc-name'
          label='Card holder name'
          className='col-span-full [&>input]:uppercase'
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
          name='cardExpirationDate'
          label='Expiration date (MM/YY)'
          pattern='^(0[1-9]|1[0-2])\/\d{2}$'
          className='col-span-3 2xl:col-span-2'
        />
        <TextInput
          required
          size={3}
          label='CVV'
          maxLength={3}
          name='cardCvv'
          type='password'
          autoComplete='cc-csc'
          className='col-span-1'
        />
      </FormValidation>
    </FormSection>
  )
}

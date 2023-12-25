import { phone } from '~/validations'
import cardValidator from 'card-validator'
import {
  array,
  coerce,
  custom,
  email,
  merge,
  minLength,
  minValue,
  nullish,
  number,
  object,
  string,
  value,
} from 'valibot'

const lastName = string([minLength(1, 'Enter last name')])
const firstName = string([minLength(1, 'Enter first name')])
const addressLine2 = string('Must be string')
const city = string([minLength(1, 'Enter city')])
const address = string([minLength(1, 'Enter address')])
const state = string([minLength(1, 'Enter state / province')])
const postalCode = string([
  minLength(1, 'Enter postal code'),
  custom((value) => cardValidator.postalCode(value).isValid, 'Must be valid'),
])

const shippingAddressSchema = object({
  shippingLastName: lastName,
  shippingFirstName: firstName,
  shippingPhone: phone(),
  shippingAddressLevel2: city,
  shippingAddressLevel3: state,
  shippingStreetAddress: address,
  shippingPostalCode: postalCode,
  shippingAddressLevel4: addressLine2,
})

const billingAddressSchema = object({
  billingLastName: lastName,
  billingFirstName: firstName,
  billingPhone: phone(),
  billingAddressLevel2: city,
  billingAddressLevel3: state,
  billingStreetAddress: address,
  billingPostalCode: postalCode,
  billingAddressLevel4: addressLine2,
})

export const defaultOrderSchema = merge([
  object({
    email: string([minLength(1, 'Enter email'), email('Invalid email')]),
    quantity: coerce(number([minValue(1, 'Must be greater than 0')]), Number),
  }),
  shippingAddressSchema,
])

export const fullOrderSchema = merge([
  object({
    sameAsShipping: nullish(string([value('on')])),
  }),
  defaultOrderSchema,
  billingAddressSchema,
])

export const cardSchema = object({
  cardHolderName: string([
    minLength(1, 'Enter card holder name'),
    custom(
      (value) => cardValidator.cardholderName(value).isValid,
      'Invalid card holder name',
    ),
  ]),
  cardCvv: string([
    minLength(1, 'Enter card cvv'),
    custom((value) => cardValidator.cvv(value).isValid, 'Invalid cvv'),
  ]),
  cardNumber: string([
    minLength(1, 'Enter card number'),
    custom(
      (value) => cardValidator.number(value).isValid,
      'Invalid card number',
    ),
  ]),
  cardExpirationDate: string([
    minLength(1, 'Enter expiration date'),
    custom(
      (value) => cardValidator.expirationDate(value).isValid,
      'Invalid expiration date',
    ),
  ]),
})

export const reportOrderSchema = object({
  annotationLabel: string([minLength(1, 'Enter annotation label')]),
  annotationReasons: array(string([minLength(1, 'Enter annotation reasons')])),
})

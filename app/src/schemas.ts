import { phone } from '~/validations'
import cardValidator from 'card-validator'
import {
  coerce, nullish,
  custom,
  email,
  merge,
  minLength,
  minValue,
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

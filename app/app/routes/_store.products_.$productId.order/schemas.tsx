import { phoneAsync } from '~/validations'
import {
  custom,
  email,
  mergeAsync,
  minLength,
  objectAsync,
  regex,
  stringAsync,
  transformAsync,
  value,
} from 'valibot'

const lastName = stringAsync([minLength(1, 'Enter last name')])
const firstName = stringAsync([minLength(1, 'Enter first name')])
const addressLine2 = stringAsync('Must be string')
const city = stringAsync([minLength(1, 'Enter city')])
const address = stringAsync([minLength(1, 'Enter address')])
const state = stringAsync([minLength(1, 'Enter state / province')])
const postalCode = stringAsync([
  minLength(1, 'Enter postal code'),
  regex(/\d+/, 'Must be numeric'),
])

const shippingAddressSchema = objectAsync({
  shippingLastName: lastName,
  shippingFirstName: firstName,
  shippingPhone: phoneAsync(),
  shippingAddressLevel2: city,
  shippingAddressLevel3: state,
  shippingStreetAddress: address,
  shippingPostalCode: postalCode,
  shippingAddressLevel4: addressLine2,
})

const billingAddressSchema = objectAsync({
  billingLastName: lastName,
  billingFirstName: firstName,
  billingPhone: phoneAsync(),
  billingAddressLevel2: city,
  billingAddressLevel3: state,
  billingStreetAddress: address,
  billingPostalCode: postalCode,
  billingAddressLevel4: addressLine2,
})

export const defaultOrderSchema = mergeAsync([
  objectAsync({
    email: stringAsync([minLength(1, 'Enter email'), email('Invalid email')]),
    quantity: transformAsync(
      stringAsync([
        custom((value) => Number(value) > 0, 'Must be greater than 0'),
      ]),
      (value) => Number(value),
    ),
  }),
  shippingAddressSchema,
])

export const fullOrderSchema = mergeAsync([
  objectAsync({
    sameAsShipping: stringAsync([value('on')]),
  }),
  defaultOrderSchema,
  billingAddressSchema,
])

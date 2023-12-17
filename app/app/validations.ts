import {
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js'
import { custom, minLength, stringAsync, toCustom } from 'valibot'

export const toPhone = () =>
  toCustom((value: string) => formatIncompletePhoneNumber(value))

export const phone = () =>
  custom((value: string) => isValidPhoneNumber(value), 'Invalid phone number')

export const phoneAsync = () =>
  stringAsync([minLength(1, 'Enter phone number'), toPhone(), phone()])

export const toNumber = () =>
  toCustom((value: number | string) => Number(value))

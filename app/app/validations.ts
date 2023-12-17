import {
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js'
import { custom, minLength, string, toCustom } from 'valibot'

export const toPhone = () =>
  toCustom((value: string) => formatIncompletePhoneNumber(value))

export const isPhone = () =>
  custom((value: string) => isValidPhoneNumber(value), 'Invalid phone number')

export const phone = () =>
  string([minLength(1, 'Enter phone number'), toPhone(), isPhone()])

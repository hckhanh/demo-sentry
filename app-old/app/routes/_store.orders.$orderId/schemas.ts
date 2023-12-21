import cardValidator from 'card-validator'
import { custom, minLength, object, string } from 'valibot'

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

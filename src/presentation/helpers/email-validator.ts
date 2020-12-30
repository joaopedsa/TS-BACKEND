import { EmailValidator } from '../protocols/email-validator'

export class EmailValidatorHelper implements EmailValidator {
  isValid (email: string): Boolean {
    return true
  }
}

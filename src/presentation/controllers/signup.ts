import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'

import { MissingParams } from '../errors/missing-params'
import { badRequest } from '../helpers/http'
import { InvalidParams } from '../errors/invalid-params'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParams(field))
      }
    }

    const validEmail = this.emailValidator.isValid(httpRequest.body.email)
    if (!validEmail) {
      return badRequest(new InvalidParams('email'))
    }
  }
}

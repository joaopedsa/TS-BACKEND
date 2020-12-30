import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

import { MissingParams, InvalidParams, ServerError } from '../errors'
import { badRequest, internalServerError } from '../helpers/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
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
    } catch (err: unknown) {
      return internalServerError(new ServerError())
    }
  }
}

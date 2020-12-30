import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParams } from '../errors/missing-params'
import { badRequest } from '../helpers/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParams(field))
      }
    }
  }
}

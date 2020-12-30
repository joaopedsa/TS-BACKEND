import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParams } from '../errors/missing-params'
import { badRequest } from '../helpers/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParams('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParams('email'))
    }
  }
}

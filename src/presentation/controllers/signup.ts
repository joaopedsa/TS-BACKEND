import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParams } from '../errors/missing-params'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParams('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParams('email')
      }
    }
  }
}

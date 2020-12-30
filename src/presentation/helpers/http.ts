import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const internalServerError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error
  }
}

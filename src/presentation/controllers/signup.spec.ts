import { SignUpController } from './signup'
import { MissingParams, InvalidParams } from '../errors'
import { EmailValidator } from '../protocols'

const makeEmailValidatorError = (): EmailValidator => {
  class EmailValidatorErrorStub implements EmailValidator {
    isValid (email: string): boolean {
      throw new Error()
    }
  }
  return new EmailValidatorErrorStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (emailValidator: EmailValidator): SignUpController => {
  return new SignUpController(emailValidator)
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const emailValidator = makeEmailValidator()
    const sut = makeSut(emailValidator)
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParams('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const emailValidator = makeEmailValidator()
    const sut = makeSut(emailValidator)
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParams('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const emailValidator = makeEmailValidator()
    const sut = makeSut(emailValidator)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParams('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const emailValidator = makeEmailValidator()
    const sut = makeSut(emailValidator)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParams('passwordConfirmation'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const emailValidator = makeEmailValidator()
    const sut = makeSut(emailValidator)
    jest.spyOn(emailValidator, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'incorrect_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'

      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParams('email'))
  })

  test('Should return 500 if emailvalidator throw an unexpected error', () => {
    const emailValidator = makeEmailValidatorError()
    const sut = makeSut(emailValidator)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'incorrect_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'

      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})

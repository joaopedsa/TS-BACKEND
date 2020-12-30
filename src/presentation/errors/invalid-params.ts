export class InvalidParams extends Error {
  constructor (paramName: string) {
    super(`Invalid Param: ${paramName} `)
    this.name = 'InvalidParamsError'
  }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import HTTP_STATUS_CODE from '../constants/httpCodes'

class AppError {
  public readonly message: string
  public readonly responseStatusCode: number
  public readonly errorDetails: any
  
  constructor(message: string, responseStatusCode: number, errorDetails: any) {
    const { name, statusCode } = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    this.message = message || ''
    this.responseStatusCode = responseStatusCode || statusCode
    this.errorDetails = errorDetails || name
  }
}

export default AppError

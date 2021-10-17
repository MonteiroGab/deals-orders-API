import HTTP_STATUS_CODE from '../constants/httpCodes'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface IReturnBody {
  statusCode: number
  body: string
}

class Result {
  private code: number

  private message: string

  private data?: any

  private error?: any

  constructor(code: number, message: string, data?: any, error?: any) {
    this.code = code
    this.message = message
    this.data = data
    this.error = error
  }

  bodyToString(): any {
    return {
      statusCode: this.code,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
        error: this.error,
      }),
    }
  }
}

export class MessageUtil {
  static success(
    message: string,
    code: number,
    data: Record<string, unknown> = {},
    error: Record<string, unknown> = {},
  ): any {
    return new Result(code, message, data, error)
  }

  static error(
    message: string,
    code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR.statusCode,
    data: Record<string, unknown> = {},
    error: Record<string, unknown> = {},
  ): any {
    return new Result(code, message, data, error)
  }
}

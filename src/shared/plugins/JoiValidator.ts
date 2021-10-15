/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Joi from 'joi'
import HTTP_STATUS_CODE from '../constants/httpCodes'
import AppError from '../errors/ApplicationError'

export class JoiValidator {
  static async validateAsync(schema: Joi.Schema, data: any) {
    const validate = await schema.validateAsync(data, { abortEarly: false }).catch(error => {
      const { message, path, type, context } = error.details[0]
      const joiError = { path, type, context }
      throw new AppError(message, HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY.statusCode, joiError)
    })
    return validate
  }
}


// É um middleware do JOI para validar os dados de entrada em JSON. 



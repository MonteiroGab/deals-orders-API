import { FastifyReply, FastifyRequest } from 'fastify'
import { JoiValidator } from '@src/shared/plugins/JoiValidator'
import { MessageUtil } from '@src/shared/helpers/message'
import DealsController from './controllers/DealsController'
import { dealsCreateSchema } from './schemas/dealsCreateSchema'

export const createDeals = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = request.body
    await JoiValidator.validateAsync(dealsCreateSchema, body)
    const dealsController = new DealsController()
    const response = await dealsController.create(body)
    reply.code(response.statusCode).send(MessageUtil.success(response.message, response.statusCode, response.data, {}))
  } catch (error) {
    reply
      .code(error.responseStatusCode)
      .send(MessageUtil.error(error.message, error.responseStatusCode, {}, error.errorDetails))
  }
}

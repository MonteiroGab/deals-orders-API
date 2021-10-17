import { FastifyReply, FastifyRequest } from 'fastify'
import { MessageUtil } from '@src/shared/helpers/message'
import OrdersController from './controllers/OrdersController'

export const getOrders = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const ordersController = new OrdersController()
    const response = await ordersController.get()
    reply.code(response.statusCode).send(MessageUtil.success(response.message, response.statusCode, response.data, {}))
  } catch (error) {
      console.log(error)
    reply
      .code(error.responseStatusCode)
      .send(MessageUtil.error(error.message, error.responseStatusCode, {}, error.errorDetails))
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import  HealthCheckController from './controller/healthcheck'
const healthcheckController = new HealthCheckController()

export const healthCheck = async (_request: FastifyRequest, reply: FastifyReply) => {
  const response: any = await healthcheckController.healthCheckStatus()
  reply.code(response.statusCode).send(response.data)
}

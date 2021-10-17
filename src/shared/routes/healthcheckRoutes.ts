import { healthCheck } from '@src/healthcheck/handler'

const healthcheckRoutes = {
  params: (fastify, _opts, next) => {
    fastify.get('/healthcheck', healthCheck)
    next()
  }
}
export { healthcheckRoutes }

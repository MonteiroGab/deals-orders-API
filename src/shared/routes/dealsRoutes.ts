import { createDeals } from '@src/backoffice/deals/handler'

const dealsRoutes = {
  params: (fastify, _opts, next) => {
    fastify.post('', createDeals)
    next()
  },
}
export { dealsRoutes }
